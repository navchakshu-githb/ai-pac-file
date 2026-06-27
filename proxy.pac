function FindProxyForURL(url, host) {

    // =========================================================
    // PROXY PAC FILE
    // Purpose : Route AI/LLM API traffic via Portkey gateway
    // Proxy   : HTTPS api.portkey.ai:443
    // Fallback: DIRECT (all other traffic)
    // =========================================================

    var PORTKEY = "HTTPS api.portkey.ai:443";
    var DIRECT  = "DIRECT";

    // ----------------------------------------------------------
    // Helper: match host against a list of domain suffixes/exact
    // ----------------------------------------------------------
    function matchesDomain(host, domains) {
        for (var i = 0; i < domains.length; i++) {
            var d = domains[i];
            if (d.charAt(0) === ".") {
                // suffix match  e.g. ".claude.ai" matches "foo.claude.ai"
                if (dnsDomainIs(host, d) || host === d.substring(1)) {
                    return true;
                }
            } else {
                // exact match
                if (host === d) {
                    return true;
                }
            }
        }
        return false;
    }

    // ----------------------------------------------------------
    // 1. Anthropic / Claude
    // ----------------------------------------------------------
    var anthropic = [
        ".claude.ai",
        "api.anthropic.com"
    ];

    // ----------------------------------------------------------
    // 2. AWS Bedrock Runtime (all regional endpoints)
    // ----------------------------------------------------------
    var bedrock = [
        "bedrock-runtime.ap-northeast-1.amazonaws.com",
        "bedrock-runtime.ap-northeast-2.amazonaws.com",
        "bedrock-runtime.ap-northeast-3.amazonaws.com",
        "bedrock-runtime.ap-south-1.amazonaws.com",
        "bedrock-runtime.ap-southeast-1.amazonaws.com",
        "bedrock-runtime.ap-southeast-2.amazonaws.com",
        "bedrock-runtime.ca-central-1.amazonaws.com",
        "bedrock-runtime.eu-central-1.amazonaws.com",
        "bedrock-runtime.eu-west-1.amazonaws.com",
        "bedrock-runtime.eu-west-2.amazonaws.com",
        "bedrock-runtime.eu-west-3.amazonaws.com",
        "bedrock-runtime.sa-east-1.amazonaws.com",
        "bedrock-runtime.us-east-1.amazonaws.com",
        "bedrock-runtime.us-east-2.amazonaws.com",
        "bedrock-runtime.us-gov-east-1.amazonaws.com",
        "bedrock-runtime.us-west-2.amazonaws.com"
    ];

    // ----------------------------------------------------------
    // 3. Bolt.new
    // ----------------------------------------------------------
    var bolt = [
        ".bolt.new"
    ];

    // ----------------------------------------------------------
    // 4. Builder.io
    // ----------------------------------------------------------
    var builder = [
        ".api.builder.io",
        ".cdn.builder.io",
        ".cdn.builder.codes"
    ];

    // ----------------------------------------------------------
    // 5. DeepAI
    // ----------------------------------------------------------
    var deepai = [
        "api.deepai.org"
    ];

    // ----------------------------------------------------------
    // 6. ElevenLabs
    // ----------------------------------------------------------
    var elevenlabs = [
        "api.us.elevenlabs.io"
    ];

    // ----------------------------------------------------------
    // 7. Gamma
    // ----------------------------------------------------------
    var gamma = [
        ".api.gamma.app",
        ".ai.api.gamma.app"
    ];

    // ----------------------------------------------------------
    // 8. GitHub Copilot
    // ----------------------------------------------------------
    var copilot = [
        "api.individual.githubcopilot.com",
        "api.business.githubcopilot.com",
        "api.enterprise.githubcopilot.com"
    ];

    // ----------------------------------------------------------
    // 9. Glean
    // ----------------------------------------------------------
    var glean = [
        ".glean.com"
    ];

    // ----------------------------------------------------------
    // 10. Google Gemini
    // ----------------------------------------------------------
    var gemini = [
        ".gemini.google.com",
        "cloudcode-pa.googleapis.com"
    ];

    // ----------------------------------------------------------
    // 11. Google Discovery Engine / Vertex AI Search
    // ----------------------------------------------------------
    var discovery = [
        ".biz-discoveryengine.googleapis.com",
        ".content-us-discoveryengine.googleapis.com",
        ".discoveryengine.clients6.google.com",
        ".us-discoveryengine.clients6.google.com",
        ".eu-discoveryengine.clients6.google.com",
        ".global-discoveryengine.clients6.google.com",
        ".us-discoveryengine.googleapis.com",
        ".eu-discoveryengine.googleapis.com",
        "appsgenaiserver-pa.clients6.google.com",
        ".cloudconsole-pa.clients6.google.com"
    ];

    // ----------------------------------------------------------
    // 12. Grok (xAI)
    // ----------------------------------------------------------
    var grok = [
        ".grok.com"
    ];

    // ----------------------------------------------------------
    // 13. Lovable
    // ----------------------------------------------------------
    var lovable = [
        "api.lovable.dev"
    ];

    // ----------------------------------------------------------
    // 14. MaxAI
    // ----------------------------------------------------------
    var maxai = [
        ".api.maxai.me"
    ];

    // ----------------------------------------------------------
    // 15. Microsoft Copilot / Office AI
    // ----------------------------------------------------------
    var microsoft = [
        ".augloop.office.com",
        ".copilot.microsoft.com",
        ".substrate.office.com",
        ".cloud.microsoft"
    ];

    // ----------------------------------------------------------
    // 16. Mistral AI
    // ----------------------------------------------------------
    var mistral = [
        ".mistral.ai"
    ];

    // ----------------------------------------------------------
    // 17. Napkin AI
    // ----------------------------------------------------------
    var napkin = [
        ".app.napkin.ai"
    ];

    // ----------------------------------------------------------
    // 18. NotebookLM (Google)
    // ----------------------------------------------------------
    var notebooklm = [
        ".notebooklm.google.com"
    ];

    // ----------------------------------------------------------
    // 19. OpenAI / ChatGPT
    // ----------------------------------------------------------
    var openai = [
        ".chatgpt.com",
        ".chat.openai.com"
    ];

    // ----------------------------------------------------------
    // 20. OpenCode AI
    // ----------------------------------------------------------
    var opencode = [
        ".opencode.ai"
    ];

    // ----------------------------------------------------------
    // 21. Perplexity AI
    // ----------------------------------------------------------
    var perplexity = [
        ".perplexity.ai"
    ];

    // ----------------------------------------------------------
    // Combined lookup — order does not matter for correctness
    // ----------------------------------------------------------
    var allAiDomains = [].concat(
        anthropic,
        bedrock,
        bolt,
        builder,
        deepai,
        elevenlabs,
        gamma,
        copilot,
        glean,
        gemini,
        discovery,
        grok,
        lovable,
        maxai,
        microsoft,
        mistral,
        napkin,
        notebooklm,
        openai,
        opencode,
        perplexity
    );

    // ----------------------------------------------------------
    // Routing decision
    // ----------------------------------------------------------
    if (matchesDomain(host, allAiDomains)) {
        return PORTKEY;
    }

    // Everything else goes direct
    return DIRECT;
}
