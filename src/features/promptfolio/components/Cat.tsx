import { Document, Page } from 'react-pdf';

export function Cat() {
	return (
		<Document file="localhost:3000/public/resume.pdf">
			<Page />
		</Document>
	);
}
