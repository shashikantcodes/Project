import React from 'react'

function ProblemSolving() {
    return (
        <>

            {/* Problem We Solve Section */}
            <article className="py-5 bg-body">
                <div className="container">
                    <h2 className="text-center fw-bold mb-4 text-body">Problems We Solve</h2>
                    <p className="text-center mb-5 fs-5 text-secondary">
                        Quick Desk AI is built to eliminate chaos, reduce manual work, and unlock insights with automation and AI.
                    </p>
                    <div className="row g-4">
                        {/* Card 1 */}
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm bg-light-subtle dark:bg-dark-subtle">
                                <div className="card-body">
                                    <h5 className="card-title text-body">⏳ Manual Work Overload</h5>
                                    <p className="card-text text-secondary">
                                        Teams waste hours logging tasks, sending updates, and filling data manually in spreadsheets or disconnected apps.
                                    </p>
                                    <span className="badge bg-primary">Solved with Automation</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm bg-light-subtle dark:bg-dark-subtle">
                                <div className="card-body">
                                    <h5 className="card-title text-body">📊 No Real-Time Insights</h5>
                                    <p className="card-text text-secondary">
                                        Managers struggle to make decisions without instant dashboards, reports, or visibility into team productivity.
                                    </p>
                                    <span className="badge bg-success">Solved with AI Reports</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm bg-light-subtle dark:bg-dark-subtle">
                                <div className="card-body">
                                    <h5 className="card-title text-body">🧩 Too Many Disconnected Tools</h5>
                                    <p className="card-text text-secondary">
                                        Jumping between apps for notes, tasks, emails, and reporting breaks focus and slows teams down.
                                    </p>
                                    <span className="badge bg-warning text-dark">Solved with Smart Integrations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>)
}

export default ProblemSolving