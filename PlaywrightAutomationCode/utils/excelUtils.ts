

import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

export function readExcel(
  filePath: string,
  sheetName: string
): Record<string, unknown>[] {

  // Resolve path from the project root
  const absolutePath = path.resolve(process.cwd(), filePath);

  console.log('Excel file path:', absolutePath);

  // Check whether file exists
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Excel file not found: ${absolutePath}`);
  }

  // Read workbook
  const workbook = XLSX.readFile(absolutePath);

  console.log('Available sheets:', workbook.SheetNames);

  // Get worksheet
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error(
      `Sheet "${sheetName}" not found. Available sheets: ${workbook.SheetNames.join(', ')}`
    );
  }

  // Convert rows into objects using the first row as headers
  const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(
    worksheet,
    { defval: '' }
  );

  console.log('Excel rows read:', data.length);
  console.log('Excel data:', data);

  return data;
}