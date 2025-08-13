import { json } from '@sveltejs/kit';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
	try {
		const templatesPath = join(process.cwd(), 'static', 'templates');
		const files = await readdir(templatesPath);

		// Filter for JSON files only
		const jsonFiles = files.filter((file) => file.endsWith('.json'));

		const templates = await Promise.all(
			jsonFiles.map(async (file) => {
				try {
					const filePath = join(templatesPath, file);
					const content = await readFile(filePath, 'utf-8');
					const templateData = JSON.parse(content);

					return {
						id: file.replace('.json', ''),
						name: templateData.name || file.replace('.json', ''),
						filename: file
					};
				} catch (error) {
					console.error(`Error reading template ${file}:`, error);
					return null;
				}
			})
		);

		// Filter out any failed template loads and sort by name
		const validTemplates = templates
			.filter((template) => template !== null)
			.sort((a, b) => a.name.localeCompare(b.name));

		return json(validTemplates);
	} catch (error) {
		console.error('Error reading templates directory:', error);
		return json([]);
	}
}
