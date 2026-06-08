import fs from 'node:fs';
import path from 'node:path';

import { getCourseBySlug } from '../data/coursePackage.js';
import { verifyCourseAccessToken } from './_course-access.js';

function getCloudinaryCourseUrl(fileName) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME || '';
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'cours';

  if (!cloudName) return '';

  const normalizedFolder = folder.replace(/^\/+|\/+$/g, '');
  const encodedPath = [normalizedFolder, fileName]
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');

  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/raw/upload/${encodedPath}`;
}

function setPdfHeaders(res, course, download, contentLength = '') {
  const encodedFileName = encodeURIComponent(course.fileName);

  res.setHeader('Content-Type', 'application/pdf');
  if (contentLength) res.setHeader('Content-Length', contentLength);
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader(
    'Content-Disposition',
    `${download ? 'attachment' : 'inline'}; filename="${course.fileName}"; filename*=UTF-8''${encodedFileName}`
  );
}

async function serveCloudinaryPdf(res, course, download) {
  const cloudinaryUrl = getCloudinaryCourseUrl(course.fileName);
  if (!cloudinaryUrl) return false;

  const response = await fetch(cloudinaryUrl);
  if (!response.ok) {
    const cloudinaryError = response.headers.get('x-cld-error') || '';
    const isPdfDeliveryBlocked = response.status === 401 && cloudinaryError.toLowerCase().includes('deny');

    if (isPdfDeliveryBlocked) {
      res.status(502).json({
        error:
          'Cloudinary bloque encore la livraison des PDF. Activez "Allow delivery of PDF and ZIP files" dans les parametres Security du Product Environment Cloudinary.',
      });
      return true;
    }

    return false;
  }

  setPdfHeaders(res, course, download, response.headers.get('content-length') || '');

  if (response.body) {
    const { Readable } = await import('node:stream');
    Readable.fromWeb(response.body).pipe(res);
    return true;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = String(req.query.token || '');
  const slug = String(req.query.slug || '');
  const download = String(req.query.download || '') === '1';
  const access = verifyCourseAccessToken(token);

  if (!access.valid) {
    return res.status(401).json({ error: access.reason || 'Acces non autorise.' });
  }

  const course = getCourseBySlug(slug);
  if (!course) {
    return res.status(404).json({ error: 'Cours introuvable.' });
  }

  const filePath = path.join(process.cwd(), 'private', 'course-package', course.fileName);
  if (!fs.existsSync(filePath)) {
    if (await serveCloudinaryPdf(res, course, download)) {
      return;
    }

    return res.status(404).json({ error: 'Fichier indisponible.' });
  }

  const stat = fs.statSync(filePath);
  setPdfHeaders(res, course, download, stat.size);
  fs.createReadStream(filePath).pipe(res);
}
