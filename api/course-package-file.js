import fs from 'node:fs';
import path from 'node:path';

import { getCourseBySlug } from '../data/coursePackage.js';
import { verifyCourseAccessToken } from './_course-access.js';

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
    return res.status(404).json({ error: 'Fichier indisponible.' });
  }

  const stat = fs.statSync(filePath);
  const encodedFileName = encodeURIComponent(course.fileName);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader(
    'Content-Disposition',
    `${download ? 'attachment' : 'inline'}; filename="${course.fileName}"; filename*=UTF-8''${encodedFileName}`
  );

  fs.createReadStream(filePath).pipe(res);
}
