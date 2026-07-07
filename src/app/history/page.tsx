"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type OutreachRow = {
  id: string;
  prospect_name: string | null;
  company: string | null;
  role: string | null;
  offer: string | null;
  pain_point: string | null;
  email_subject: string | null;
  email_body: string | null;
  linkedin_message: string | null;
  created_at: string | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const [rows, setRows] = useState<OutreachRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      const { data, error: fetchError } = await supabase
        .from("outreach")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setRows(data ?? []);
      }
      setLoading(false);
    }

    fetchHistory();
  }, []);

  async function handleCopy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setError("Could not copy to clipboard.");
    }
  }

  return (
    <div className="min-h-screen w-full bg-zinc-100 px-4 py-12 dark:bg-zinc-950">
      <main className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            History
          </h1>
          <Link
            href="/"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Generate New
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {loading && (
            <p className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Loading history...
            </p>
          )}

          {error && (
            <p className="p-8 text-center text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {!loading && !error && rows.length === 0 && (
            <p className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No saved outreach yet.{" "}
              <Link
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Generate your first one
              </Link>
            </p>
          )}

          {!loading && !error && rows.length > 0 && (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                <tr>
                  <th className="px-6 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                    Prospect Name
                  </th>
                  <th className="px-6 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                    Company
                  </th>
                  <th className="px-6 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {rows.map((row) => {
                  const isExpanded = expandedId === row.id;
                  const emailKey = `${row.id}-email`;
                  const linkedinKey = `${row.id}-linkedin`;

                  return (
                    <tr key={row.id} className="group">
                      <td colSpan={3} className="p-0">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(isExpanded ? null : row.id)
                          }
                          className="grid w-full grid-cols-1 gap-2 px-6 py-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 sm:grid-cols-3 sm:gap-0"
                        >
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">
                            {row.prospect_name}
                          </span>
                          <span className="text-zinc-700 dark:text-zinc-300">
                            {row.company}
                          </span>
                          <span className="text-zinc-500 dark:text-zinc-400">
                            {row.created_at
                              ? formatDate(row.created_at)
                              : "—"}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-5 dark:border-zinc-800 dark:bg-zinc-950/50">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                              <div>
                                <div className="mb-3 flex items-center justify-between">
                                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    Cold Email
                                  </h3>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopy(
                                        `Subject: ${row.email_subject}\n\n${row.email_body}`,
                                        emailKey
                                      )
                                    }
                                    className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                  >
                                    {copied === emailKey ? "Copied!" : "Copy"}
                                  </button>
                                </div>
                                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                                  {row.email_subject}
                                </p>
                                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                  {row.email_body}
                                </p>
                              </div>

                              <div>
                                <div className="mb-3 flex items-center justify-between">
                                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    LinkedIn Message
                                  </h3>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopy(
                                        row.linkedin_message ?? "",
                                        linkedinKey
                                      )
                                    }
                                    className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                  >
                                    {copied === linkedinKey
                                      ? "Copied!"
                                      : "Copy"}
                                  </button>
                                </div>
                                <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                  {row.linkedin_message}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
