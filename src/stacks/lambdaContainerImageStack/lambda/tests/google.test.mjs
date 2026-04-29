export async function runTest(page) {
	const url = "https://www.google.com";
	await page.goto(url, { waitUntil: "networkidle" });

	const title = await page.title();

	if (title.includes("Google")) {
		return { title, message: "Successfully accessed Google." };
	} else {
		throw new Error(`Expected title to include "Google", but got "${title}"`);
	}
}
