"use server";

import { google } from "googleapis";

/**
 * Note: This action is intended to be used as a Server Action.
 */

export async function submitWaitlist(formData: FormData) {
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const project = formData.get("project") as string;
    const referrer = (formData.get("referrer") as string) || "";

    if (!email || !username) {
        throw new Error("Email and username are required");
    }

    const timestamp = new Date().toISOString();

    // --- OPTION 1: Super Simple Apps Script ---
    if (process.env.GOOGLE_SCRIPT_URL) {
        try {
            const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify({ type: "waitlist", email, username, project, referrer }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const result = (await response.json()) as { position?: number };
                // Return position if script provides it, otherwise calculate high baseline
                return {
                    success: true,
                    position: result.position || 500 + Math.floor(Math.random() * 50),
                };
            }
        } catch (error) {
            console.error("Apps Script Error:", error);
        }
    }

    // --- OPTION 2: Standard Google APIs Library ---
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Get current rows to calculate position
        const stats = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A:A",
        });
        const currentCount = stats.data.values?.length || 0;
        const position = 500 + currentCount + 1;

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A:F",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[timestamp, "waitlist", email, project, username, referrer]],
            },
        });

        return { success: true, position };
    } catch (error) {
        console.error("Error submitting to Google Sheets:", error);
        if (!process.env.GOOGLE_SHEET_ID && !process.env.GOOGLE_SCRIPT_URL) {
            return { success: true, mock: true, position: 542 };
        }
        throw new Error("Failed to join waitlist");
    }
}

export async function trackEvent(eventName: string, metadata: string = "") {
    const payload = {
        type: "event",
        eventName,
        page: "/",
        metadata,
    };

    if (process.env.GOOGLE_SCRIPT_URL) {
        try {
            await fetch(process.env.GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.error("Tracking Error (Apps Script):", error);
        }
    } else if (process.env.GOOGLE_SHEET_ID) {
        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                },
                scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            });
            const sheets = google.sheets({ version: "v4", auth });
            await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: "Sheet1!A:F",
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[new Date().toISOString(), "event", eventName, "/", metadata, ""]],
                },
            });
        } catch (error) {
            console.error("Tracking Error (Google API):", error);
        }
    }
}

export async function getAnalyticsData() {
    // Try Simple Method First (Apps Script GET)
    if (process.env.GOOGLE_SCRIPT_URL) {
        try {
            const response = await fetch(process.env.GOOGLE_SCRIPT_URL);
            if (response.ok) {
                const rows = (await response.json()) as string[][];
                return processRows(rows);
            }
        } catch (error) {
            console.error("Apps Script Fetch Error:", error);
        }
    }

    // Fallback to Standard Google API
    if (!process.env.GOOGLE_SHEET_ID) {
        return { waitlist: [], events: [], mock: true };
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets-readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A:F",
        });

        return processRows((response.data.values as string[][]) || []);
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return { waitlist: [], events: [], mock: true };
    }
}

function processRows(rows: string[][]) {
    const waitlist = rows
        .filter((row) => row[1] === "waitlist")
        .map((row) => ({
            timestamp: row[0],
            email: row[2],
            project: row[3],
            username: row[4],
            referrer: row[5] || "",
        }));

    const events = rows
        .filter((row) => row[1] === "event")
        .map((row) => ({
            timestamp: row[0],
            eventName: row[2],
            page: row[3],
            metadata: row[4],
        }));

    return { waitlist, events, mock: false };
}
