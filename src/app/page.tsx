export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-100 px-4 py-12 dark:bg-zinc-950">
      <main className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Outreach Generator
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Fill in the details below to craft a personalized outreach email.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="prospectName"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Prospect Name
                </label>
                <input
                  id="prospectName"
                  name="prospectName"
                  type="text"
                  placeholder="Jane Smith"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Inc."
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Their Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                placeholder="VP of Marketing"
                className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>

            <div>
              <label
                htmlFor="offer"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Your Offer / What You Do
              </label>
              <textarea
                id="offer"
                name="offer"
                rows={3}
                placeholder="We help B2B teams automate their sales outreach..."
                className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>

            <div>
              <label
                htmlFor="painPoint"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Pain Point / Reason for Reaching Out
              </label>
              <textarea
                id="painPoint"
                name="painPoint"
                rows={3}
                placeholder="I noticed your team is hiring SDRs, which often signals..."
                className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              Generate
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
