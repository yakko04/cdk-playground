import { chromium } from "playwright";

export const handler = async (event) => {
	const testName = event.testName || "google"; // デフォルトは google
	console.log(`[Start] Testing: ${testName}`);

	const browser = await chromium.launch({
		args: [
			"--single-process",
			"--disable-dev-shm-usage",
			"--no-sandbox",
			"--disable-setuid-sandbox",
		],
	});

	try {
		const context = await browser.newContext();
		const page = await context.newPage();

		// tests フォルダから動的にインポート
		const testModule = await import(`./tests/${testName}.test.mjs`);

		// テスト実行（pageオブジェクトを渡す）
		const result = await testModule.runTest(page);

		return {
			statusCode: 200,
			body: JSON.stringify({ status: "success", testName, result }),
		};
	} catch (error) {
		console.error(`[Error] Test "${testName}" failed:`, error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				status: "failed",
				testName,
				error: error.message,
			}),
		};
	} finally {
		await browser.close();
	}
};
