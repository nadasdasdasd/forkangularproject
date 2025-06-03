const PROXY_CONFIG = [
    {
      context: [
        "/api/*",
        "/api/ProcPlan/*",
        "/api/ProcPlanList/*",
        "/api/Employee/**",
        "/api/Approval/**"
      ],
      target: "https://localhost:44303",
      secure: false
    }
  ]
  
  module.exports = PROXY_CONFIG;