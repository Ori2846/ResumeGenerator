import fs from 'fs';
import path from 'path';
import os from 'os';

export default function handler(req, res) {
  const { filePath } = req.query;
  const tempDir = os.tmpdir();
  const fullPath = path.resolve(tempDir, path.basename(filePath));

  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.setHeader('Content-Disposition', `attachment; filename=${path.basename(fullPath)}`);
  const fileStream = fs.createReadStream(fullPath);
  fileStream.pipe(res);
}
