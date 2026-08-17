/* ================================================================
   PAWAN ASHOK FUNDE — MINIMALIST TECH PORTFOLIO (PURE DARK)
   Features:
   - Dynamic Data Analytics Background Canvas
   - Smooth Time-Series Trend Curves
   - Ingestion Data Packet Pulse Streams
   - Interactive Node Proximity & Cursor Telemetry
   - Asynchronous Contact Form & Quick Email Copy
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. MOBILE NAVIGATION ─────────────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  /* ── 2. COPY EMAIL TO CLIPBOARD ──────────────────────────────── */
  const copyBtn = document.getElementById("copyEmailBtn");
  const toast = document.getElementById("toast");

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = copyBtn.getAttribute("data-email") || "pawanfunde96@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("Copied email to clipboard");
      }).catch(() => {
        showToast(email);
      });
    });
  }

  /* ── 3. ASYNC CONTACT FORM SUBMISSION ────────────────────────── */
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: formData
        });

        if (response.ok) {
          contactForm.reset();
          if (formStatus) {
            formStatus.textContent = "Thank you! Your message has been sent.";
            formStatus.style.display = "block";
            setTimeout(() => {
              formStatus.style.display = "none";
            }, 5000);
          }
          showToast("Message sent successfully");
        } else {
          throw new Error("Form submission error");
        }
      } catch (err) {
        showToast("Reach me directly at pawanfunde96@gmail.com");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ── 4. SCROLL ACTIVE LINK TRACKING ──────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.scrollY;

    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }, { passive: true });

  /* ── 5. DYNAMIC DATA ANALYTICS BACKGROUND ENGINE ─────────────── */
  (function initDataAnalyticsEngine() {
    const canvas = document.getElementById("dataBgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H;
    let nodes = [];
    let packets = [];
    let waveOffset = 0;
    const mouse = { x: null, y: null, radius: 180 };

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", () => {
      resize();
      initGraph();
    }, { passive: true });

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    class DataNode {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 1;
        this.baseAlpha = Math.random() * 0.4 + 0.2;
        this.isMetric = Math.random() > 0.82; // Focal metric node
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.03;

        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;

        // Subtle mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }
      draw() {
        ctx.beginPath();
        const pulseSize = this.isMetric ? this.radius + Math.sin(this.pulse) * 0.8 : this.radius;
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);

        if (this.isMetric) {
          ctx.fillStyle = `rgba(56, 189, 248, 0.7)`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
        } else {
          ctx.fillStyle = `rgba(161, 161, 170, ${this.baseAlpha * 0.6})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class DataPacket {
      constructor(source, target) {
        this.source = source;
        this.target = target;
        this.progress = 0;
        this.speed = Math.random() * 0.012 + 0.008;
      }
      update() {
        this.progress += this.speed;
      }
      draw() {
        const px = this.source.x + (this.target.x - this.source.x) * this.progress;
        const py = this.source.y + (this.target.y - this.source.y) * this.progress;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initGraph() {
      const count = Math.min(Math.floor((W * H) / 14000), 65);
      nodes = Array.from({ length: count }, () => new DataNode());
      packets = [];
    }
    initGraph();

    // Spawn stream packets occasionally
    setInterval(() => {
      if (nodes.length < 2) return;
      const i = Math.floor(Math.random() * nodes.length);
      let closest = null;
      let minD = 140;

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minD) {
          minD = dist;
          closest = nodes[j];
        }
      }

      if (closest && packets.length < 16) {
        packets.push(new DataPacket(nodes[i], closest));
      }
    }, 280);

    // Subtle coordinate grid dots
    function drawCoordinateGrid() {
      const spacing = 75;
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      for (let x = 0; x < W; x += spacing) {
        for (let y = 0; y < H; y += spacing) {
          ctx.fillRect(x - 0.5, y - 0.5, 1.2, 1.2);
        }
      }
    }

    // Dynamic Time-Series Regression Curves (Smooth Waveforms)
    function drawTrendCurves() {
      waveOffset += 0.008;

      // Primary Analytics Trend Wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.045)";
      ctx.lineWidth = 1.4;

      for (let x = 0; x < W; x += 15) {
        const y = H * 0.35 + Math.sin(x * 0.004 + waveOffset) * 45 + Math.cos(x * 0.002 - waveOffset * 0.5) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary Moving Average Distribution Curve
      ctx.beginPath();
      ctx.strokeStyle = "rgba(34, 197, 94, 0.035)";
      ctx.lineWidth = 1.2;

      for (let x = 0; x < W; x += 15) {
        const y = H * 0.65 + Math.cos(x * 0.003 - waveOffset * 0.8) * 55 + Math.sin(x * 0.0015 + waveOffset) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);

      // 1. Grid
      drawCoordinateGrid();

      // 2. Trend Waves
      drawTrendCurves();

      // 3. Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Mouse Connections
      if (mouse.x !== null && mouse.y !== null) {
        nodes.forEach((n) => {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      // 5. Packets
      for (let k = packets.length - 1; k >= 0; k--) {
        packets[k].update();
        packets[k].draw();
        if (packets[k].progress >= 1) {
          packets.splice(k, 1);
        }
      }

      // 6. Nodes
      nodes.forEach((node) => {
        node.update();
        node.draw();
      });

      requestAnimationFrame(animate);
    }
    animate();
  })();

  /* ── 6. PROOF OF WORK & CASE STUDY MODAL SYSTEM ─────────────── */
  const projectDatabase = {
    "advanced-rag": {
      title: "Production-Grade Advanced RAG System",
      tag: "Final Year Project • GenAI & Data Science",
      year: "2025 – 2026 • Ongoing",
      tech: ["Python", "Generative AI", "LangGraph", "Qdrant", "FlashRank", "RAGAS", "FastAPI", "Docker", "GCP", "Terraform"],
      githubUrl: "https://github.com/pawan3funde",
      reportUrl: "assets/projects/advanced-rag/report.pdf",
      visual: {
        img: "assets/projects/advanced-rag/dashboard.svg",
        caption: "LangGraph Agentic State Execution & RAGAS Multi-Metric Telemetry",
        takeaways: [
          {
            title: "94.8% RAGAS Faithfulness",
            desc: "Eliminates hallucinations through FlashRank neural reranking and LLM document relevance grading."
          },
          {
            title: "LangGraph Agentic Orchestration",
            desc: "Implements adaptive query expansion, self-correction loops, and structured citations."
          },
          {
            title: "Zero-Trust Guardrail Gateway",
            desc: "Enforces input/output safety, prompt injection defense, and token optimization via NeMo & Portkey."
          }
        ]
      },
      architecture: {
        img: "assets/projects/advanced-rag/datamodel.svg",
        caption: "End-to-End Advanced RAG Data Pipeline, Vector DB & Cloud Infrastructure",
        cards: [
          {
            title: "1. Document Ingestion & Qdrant Indexing",
            desc: "Automated parsing of unstructured documents, context-aware NLP text chunking, and dense vector embeddings indexed in Qdrant with HNSW similarity search."
          },
          {
            title: "2. Hybrid Retrieval & FlashRank Reranking",
            desc: "Dense semantic search combined with sparse keyword retrieval; candidates (Top-20) are neural-reranked via FlashRank cross-encoder to extract Top-5 high-signal contexts."
          },
          {
            title: "3. LangGraph Loops & Cloud Deployment",
            desc: "Agentic decision graph managing document grading, fallback web routing, NeMo Guardrails, containerized with Docker on GCP provisioned via Terraform."
          }
        ]
      },
      code: [
        {
          title: "Python • LangGraph Agentic RAG Workflow State Machine",
          code: `from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from flashrank import Ranker, RerankRequest

class RAGState(TypedDict):
    question: str
    documents: List[str]
    generation: str
    is_grounded: bool

def retrieve_and_rerank(state: RAGState) -> dict:
    query = state["question"]
    raw_docs = qdrant_client.search(
        collection_name="enterprise_knowledge",
        query_vector=embed(query),
        limit=20
    )
    # Neural Cross-Encoder Reranking
    ranker = Ranker(model_name="ms-marco-TinyBERT-L-2-v2")
    rerank_req = RerankRequest(
        query=query, 
        passages=[{"id": d.id, "text": d.payload["text"]} for d in raw_docs]
    )
    reranked = ranker.rerank(rerank_req)[:5]
    return {"documents": [r["text"] for r in reranked]}

# Build Adaptive Agent Graph
workflow = StateGraph(RAGState)
workflow.add_node("retrieve", retrieve_and_rerank)
workflow.add_node("grade_docs", grade_retrieved_documents)
workflow.add_node("generate", generate_with_guardrails)
workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "grade_docs")
workflow.add_conditional_edges(
    "grade_docs",
    decide_to_generate,
    {"generate": "generate", "rewrite": "rewrite_query"}
)
workflow.add_edge("generate", END)
app = workflow.compile()`
        },
        {
          title: "Python • RAGAS Metric Benchmarking & Evaluation Pipeline",
          code: `from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall
)
from datasets import Dataset

# Construct RAG Evaluation Dataset
eval_dataset = Dataset.from_dict({
    "question": test_queries,
    "contexts": retrieved_contexts,
    "answer": generated_answers,
    "ground_truth": ground_truths
})

# Run Multi-Dimensional RAG Benchmarks
results = evaluate(
    dataset=eval_dataset,
    metrics=[
        faithfulness,
        answer_relevancy,
        context_precision,
        context_recall
    ]
)

print(f"Faithfulness Score: {results['faithfulness']:.4f}")
print(f"Context Precision:  {results['context_precision']:.4f}")
print(f"Answer Relevancy:   {results['answer_relevancy']:.4f}")`
        }
      ],
      report: {
        problem: "Traditional naive RAG architectures suffer from context fragmentation, high hallucination rates, irrelevant document chunks in the LLM prompt window, and a lack of standardized evaluation benchmarks for enterprise deployment.",
        approach: [
          "Engineered an end-to-end data pipeline with contextual NLP chunking, Qdrant vector indexing, and lightweight FlashRank cross-encoder neural reranking.",
          "Constructed agentic multi-hop reasoning and self-correction loops using LangGraph with NeMo Guardrails and Portkey LLM Gateway.",
          "Implemented comprehensive RAGAS automated testing (Faithfulness, Context Precision, Relevancy) and containerized the FastAPI backend for GCP deployment with Terraform."
        ],
        impact: [
          "<strong>Hallucination Suppression:</strong> Achieved 94.8% faithfulness score on RAGAS benchmarks with verified source citations.",
          "<strong>Enhanced Retrieval Relevance:</strong> FlashRank reranking improved top-K context precision to 0.91 (+36% over naive vector search).",
          "<strong>Production Infrastructure:</strong> Asynchronous FastAPI service containerized with Docker and automated GCP Terraform IaC configuration."
        ]
      }
    },

    "upi-fraud": {
      title: "UPI Transaction Fraud & Risk Analytics",
      tag: "FinTech • Risk Analytics",
      year: "Nov – Dec 2025",
      tech: ["Power BI", "Python", "SQL", "DAX", "Risk Modeling"],
      githubUrl: "https://github.com/pawan3funde",
      reportUrl: "assets/projects/upi-fraud/report.pdf",
      visual: {
        img: "assets/projects/upi-fraud/dashboard.svg",
        caption: "Power BI Merchant Fraud & Peak Hour Risk Analytics Dashboard",
        takeaways: [
          {
            title: "100,000+ Transactions Analyzed",
            desc: "Comprehensive dataset modeling ₹42.8 Crores across 12 distinct merchant categories."
          },
          {
            title: "3.84% Fraud Chargeback Ratio",
            desc: "Isolated critical off-peak (02:00 AM - 04:00 AM) high-risk transaction clusters."
          },
          {
            title: "Automated Rule Triggers",
            desc: "Modeled multi-condition velocity and geo-displacement risk algorithms."
          }
        ]
      },
      architecture: {
        img: "assets/projects/upi-fraud/dashboard.svg",
        caption: "UPI Financial Transaction Modeling & Merchant Risk Architecture",
        cards: [
          {
            title: "Fact_UPITransactions",
            desc: "Contains transaction IDs, VPA handles, amounts, failure codes, and device fingerprints."
          },
          {
            title: "Dim_Merchant & Dim_BankRoute",
            desc: "Aggregates merchant categorization (MCC codes), gateway routing SLAs, and historical chargeback ratios."
          },
          {
            title: "Temporal Partitioning",
            desc: "Modeled 24-hour time slices to detect rapid nocturnal velocity anomalies."
          }
        ]
      },
      code: [
        {
          title: "DAX • 7-Day Rolling Fraud Chargeback Ratio",
          code: `Rolling 7D Fraud Rate % = 
VAR CurrentDate = MAX(Dim_Date[DateKey])
VAR PeriodSpend = 
    CALCULATE(
        [Total Fraud Amount],
        DATESINPERIOD(Dim_Date[FullDate], CurrentDate, -7, DAY)
    )
VAR TotalPeriodSpend = 
    CALCULATE(
        [Total Transaction Volume],
        DATESINPERIOD(Dim_Date[FullDate], CurrentDate, -7, DAY)
    )
RETURN
    DIVIDE(PeriodSpend, TotalPeriodSpend, 0)`
        },
        {
          title: "SQL • Merchant Category Risk & Failure Velocity Matrix",
          code: `SELECT 
    m.merchant_category,
    COUNT(t.transaction_id) AS total_tx_count,
    SUM(t.amount_inr) AS total_volume_inr,
    ROUND(AVG(CASE WHEN t.status = 'FAILED' THEN 1.0 ELSE 0.0 END) * 100, 2) AS failure_rate_pct,
    ROUND(AVG(CASE WHEN t.is_flagged_fraud = 1 THEN 1.0 ELSE 0.0 END) * 100, 2) AS fraud_rate_pct,
    DENSE_RANK() OVER (ORDER BY SUM(CASE WHEN t.is_flagged_fraud = 1 THEN t.amount_inr ELSE 0 END) DESC) AS risk_rank
FROM fact_upi_transactions t
JOIN dim_merchant m ON t.merchant_id = m.merchant_id
WHERE t.transaction_date >= CURRENT_DATE - INTERVAL 30 DAY
GROUP BY m.merchant_category
ORDER BY risk_rank ASC;`
        }
      ],
      report: {
        problem: "Digital payment gateways experienced rising dispute ratios in high-risk categories (P2P transfers, gaming) without granular visibility into fraudulent transaction velocity.",
        approach: [
          "Performed Exploratory Data Analysis (EDA) on 100,000+ UPI records to model distribution curves and outlier amounts.",
          "Constructed DAX calculations in Power BI to track velocity spikes (>5 transactions per minute from unique VPAs).",
          "Generated correlation matrix comparing settlement latency against transaction failure rates."
        ],
        impact: [
          "<strong>&#8377;28.2 Lakhs Potential Loss Avoided:</strong> Early-warning rule simulation flagged high-frequency credential reuse.",
          "<strong>Actionable Policy Insights:</strong> Recommended dynamic 2FA escalation for transactions originating between 02:00 AM - 05:00 AM.",
          "<strong>Streamlined Reconciliation:</strong> Reduced dispute triage time across banking partner desks."
        ]
      }
    },

    "black-friday": {
      title: "Black Friday Sales & RFM Customer Segmentation",
      tag: "Commercial • Customer Analytics",
      year: "Oct – Nov 2025",
      tech: ["Power BI", "DAX Modeling", "Python", "SQL", "Advanced Excel"],
      githubUrl: "https://github.com/pawan3funde",
      reportUrl: "assets/projects/black-friday/report.pdf",
      visual: {
        img: "assets/projects/black-friday/dashboard.svg",
        caption: "Power BI RFM Customer Quintiles & Commercial Revenue Strategy Dashboard",
        takeaways: [
          {
            title: "₹5.12 Billion Gross Volume",
            desc: "Comprehensive retail analytics modeling transaction patterns of 6,000+ unique customers."
          },
          {
            title: "Top 15% VIP Champions",
            desc: "Identified high-margin buyer cohort generating 48.6% of gross campaign value."
          },
          {
            title: "Discount Elasticity Modeling",
            desc: "Preserved 8.2% gross margin by optimizing blanket discounts into targeted loyalty credits."
          }
        ]
      },
      architecture: {
        img: "assets/projects/black-friday/dashboard.svg",
        caption: "Retail Sales Star Schema & RFM Quintile Scoring Model",
        cards: [
          {
            title: "Fact_RetailOrders",
            desc: "Records item-level purchases, gross revenues, applied discount codes, and basket quantities."
          },
          {
            title: "Dim_Customer (RFM Quintiles)",
            desc: "Segmented by Recency (R: 1-5), Frequency (F: 1-5), and Monetary value (M: 1-5)."
          },
          {
            title: "Dim_Product & Dim_Demographics",
            desc: "Product category trees linked with city tiers, age bands, and marital status attributes."
          }
        ]
      },
      code: [
        {
          title: "DAX • RFM Customer Tier Segmentation",
          code: `Customer Segment = 
VAR R_Score = [Recency Score]
VAR F_Score = [Frequency Score]
VAR M_Score = [Monetary Score]
VAR CompositeScore = R_Score * 100 + F_Score * 10 + M_Score
RETURN
    SWITCH(
        TRUE(),
        R_Score >= 4 && F_Score >= 4 && M_Score >= 4, "Champions (VIP)",
        R_Score >= 3 && F_Score >= 3 && M_Score >= 3, "Loyal Customers",
        R_Score >= 4 && F_Score <= 2, "Recent Potential Loyalists",
        R_Score <= 2 && F_Score >= 3 && M_Score >= 3, "At Risk (Win-Back)",
        R_Score <= 2 && F_Score <= 2 && M_Score <= 2, "Lost / Hibernating",
        "Standard Customers"
    )`
        },
        {
          title: "SQL • Customer RFM Quintile Calculation",
          code: `WITH CustomerAggregates AS (
    SELECT 
        user_id,
        DATEDIFF(CURRENT_DATE, MAX(purchase_date)) AS recency_days,
        COUNT(DISTINCT order_id) AS frequency_orders,
        SUM(purchase_amount) AS monetary_spend
    FROM fact_retail_sales
    GROUP BY user_id
)
SELECT 
    user_id,
    recency_days,
    frequency_orders,
    monetary_spend,
    NTILE(5) OVER (ORDER BY recency_days DESC) AS r_quintile,
    NTILE(5) OVER (ORDER BY frequency_orders ASC) AS f_quintile,
    NTILE(5) OVER (ORDER BY monetary_spend ASC) AS m_quintile
FROM CustomerAggregates;`
        }
      ],
      report: {
        problem: "Retail leadership lacked actionable segmentation during annual high-volume sales, leading to margin erosion from generic 25% sitewide discounts.",
        approach: [
          "Engineered an automated RFM calculation engine in Python and SQL to classify 6,000+ buyers into 6 distinct behavioral cohorts.",
          "Built dynamic DAX measures in Power BI enabling marketing teams to filter cohorts by product affinity and city tier.",
          "Modeled product cross-sell propensity between electronics and accessory product categories."
        ],
        impact: [
          "<strong>+18.4% Average Order Value (AOV):</strong> Raised AOV from ₹7,800 to ₹9,420 through cross-sell bundles.",
          "<strong>Targeted Marketing Efficiency:</strong> Reallocated 40% of advertising budget to re-engage 'At Risk' high-monetary cohorts.",
          "<strong>Inventory Balancing:</strong> Reduced stock-outs in top metro hubs by 22% using regional demand trends."
        ]
      }
    }
  };

  /* Modal Elements */
  const caseStudyModal = document.getElementById("caseStudyModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalTag = document.getElementById("modalTag");
  const modalYear = document.getElementById("modalYear");
  const modalTechPills = document.getElementById("modalTechPills");
  const modalReportLink = document.getElementById("modalReportLink");
  const modalGithubLink = document.getElementById("modalGithubLink");
  const modalReportText = document.getElementById("modalReportText");

  // Tab Content Elements
  const modalMainImg = document.getElementById("modalMainImg");
  const modalImgCaption = document.getElementById("modalImgCaption");
  const modalVisualTakeaways = document.getElementById("modalVisualTakeaways");
  const modalModelImg = document.getElementById("modalModelImg");
  const modalSchemaDetails = document.getElementById("modalSchemaDetails");
  const modalCodeGrid = document.getElementById("modalCodeGrid");
  const modalReportSummary = document.getElementById("modalReportSummary");

  // Lightbox Elements
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");

  function openModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data || !caseStudyModal) return;

    // Header & Meta
    modalTitle.textContent = data.title;
    modalTag.textContent = data.tag;
    modalYear.textContent = data.year;

    // Tech Pills
    modalTechPills.innerHTML = data.tech.map(t => `<span class="pill">${t}</span>`).join("");

    // Action Links
    modalGithubLink.href = data.githubUrl || "https://github.com/pawan3funde";
    modalReportLink.href = data.reportUrl || "#";
    modalReportText.textContent = `View ${data.title.split(" ")[0]} Report (PDF)`;

    // Tab 1: Visuals
    modalMainImg.src = data.visual.img;
    modalMainImg.alt = data.visual.caption;
    modalImgCaption.textContent = data.visual.caption;
    modalVisualTakeaways.innerHTML = data.visual.takeaways.map(t => `
      <div class="takeaway-card">
        <div class="takeaway-card-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${t.title}</span>
        </div>
        <p class="takeaway-card-desc">${t.desc}</p>
      </div>
    `).join("");

    // Tab 2: Architecture
    modalModelImg.src = data.architecture.img;
    modalModelImg.alt = data.architecture.caption;
    modalSchemaDetails.innerHTML = data.architecture.cards.map(c => `
      <div class="schema-card">
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
      </div>
    `).join("");

    // Tab 3: Code
    modalCodeGrid.innerHTML = data.code.map((c, idx) => `
      <div class="code-box">
        <div class="code-box-header">
          <span class="code-box-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            ${c.title}
          </span>
          <button class="copy-code-btn" data-code-id="code-${idx}">Copy Code</button>
        </div>
        <pre><code id="code-${idx}">${escapeHtml(c.code)}</code></pre>
      </div>
    `).join("");

    // Attach copy handlers
    modalCodeGrid.querySelectorAll(".copy-code-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-code-id");
        const codeElement = document.getElementById(targetId);
        if (codeElement) {
          navigator.clipboard.writeText(codeElement.textContent).then(() => {
            btn.textContent = "Copied!";
            setTimeout(() => { btn.textContent = "Copy Code"; }, 2000);
          });
        }
      });
    });

    // Tab 4: Executive Report
    modalReportSummary.innerHTML = `
      <div class="report-section-block">
        <h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Problem Statement &amp; Context
        </h4>
        <p>${data.report.problem}</p>
      </div>

      <div class="report-section-block">
        <h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Analytical Methodology &amp; Engineering Approach
        </h4>
        <ul>
          ${data.report.approach.map(a => `<li>${a}</li>`).join("")}
        </ul>
      </div>

      <div class="report-section-block">
        <h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Measured Business Impact &amp; ROI
        </h4>
        <ul>
          ${data.report.impact.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    `;

    // Reset to first tab
    switchModalTab("visuals");

    // Open Modal
    caseStudyModal.classList.add("open");
    caseStudyModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!caseStudyModal) return;
    caseStudyModal.classList.remove("open");
    caseStudyModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function switchModalTab(tabId) {
    document.querySelectorAll(".modal-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });

    document.querySelectorAll(".modal-tab-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === `tab-${tabId}`);
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Bind Open Buttons on Project Items
  document.querySelectorAll(".open-case-study-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute("data-project");
      openModal(projectId);
    });
  });

  // Tab Button Clicks
  document.querySelectorAll(".modal-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchModalTab(tabId);
    });
  });

  // Modal Close Actions
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener("click", (e) => {
      if (e.target === caseStudyModal) {
        closeModal();
      }
    });
  }

  // Lightbox Handlers
  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || "";
    lightboxModal.classList.add("open");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("open");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalMainImg) {
    modalMainImg.parentElement.addEventListener("click", () => {
      openLightbox(modalMainImg.src, modalImgCaption.textContent);
    });
  }

  if (modalModelImg) {
    modalModelImg.parentElement.addEventListener("click", () => {
      openLightbox(modalModelImg.src, "Power BI Star Schema Data Model Architecture");
    });
  }

  // Certificate In-Page Preview Triggers
  document.querySelectorAll(".open-cert-preview-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-cert-img");
      const title = btn.getAttribute("data-cert-title") || "Certificate Preview";
      if (src) {
        openLightbox(src, title);
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener("click", closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal || e.target.classList.contains("lightbox-content")) {
        closeLightbox();
      }
    });
  }

  /* ── 7. IN-BROWSER RESUME PREVIEW MODAL ─────────────────────── */
  const resumeModal = document.getElementById("resumeModal");
  const resumeCloseBtn = document.getElementById("resumeCloseBtn");

  function openResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.add("open");
    resumeModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove("open");
    resumeModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".open-resume-modal-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener("click", closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  // Global Keyboard Navigation (Escape key)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightboxModal && lightboxModal.classList.contains("open")) {
        closeLightbox();
      } else if (caseStudyModal && caseStudyModal.classList.contains("open")) {
        closeModal();
      } else if (resumeModal && resumeModal.classList.contains("open")) {
        closeResumeModal();
      }
    }
  });

  /* ── 8. APPLE-INSPIRED CINEMATIC SCROLL ENGINE (GSAP + LENIS) ──── */
  const animationConfig = {
    hero: {
      yOffset: -50,
      opacityEnd: 0.15
    },
    cinematicShowcase: {
      stages: [
        { id: 1, name: "rag", label: "Production RAG Pipeline • Live Telemetry", glow: "rgba(56, 189, 248, 0.16)" },
        { id: 2, name: "fraud", label: "Anomaly Engine • 500K+ Logs Processed", glow: "rgba(239, 68, 68, 0.14)" },
        { id: 3, name: "rfm", label: "K-Means Cluster • ₹5.1B GMV Modeled", glow: "rgba(34, 197, 94, 0.15)" }
      ]
    }
  };

  // 1. Initialize Lenis Smooth Scrolling
  let lenis = null;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false
    });

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // 2. GSAP ScrollTrigger Timelines
  if (!prefersReducedMotion && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Zoom & Scroll-Out Transition
    const heroHeader = document.querySelector(".hero-header");
    const heroTeaserGlass = document.querySelector(".hero-teaser-glass");

    if (heroHeader && heroTeaserGlass) {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      })
      .to(heroHeader, {
        y: animationConfig.hero.yOffset,
        opacity: animationConfig.hero.opacityEnd,
        ease: "none"
      })
      .to(heroTeaserGlass, {
        rotateX: 0,
        scale: 1.02,
        y: -30,
        ease: "none"
      }, 0);
    }

    // Pinned Cinematic Showcase Timeline
    const cinematicSection = document.getElementById("cinematicShowcase");
    const deviceFrame = document.getElementById("deviceFrame");
    const storySlides = [
      document.getElementById("storySlide1"),
      document.getElementById("storySlide2"),
      document.getElementById("storySlide3")
    ];
    const screenSlides = [
      document.getElementById("screenSlide1"),
      document.getElementById("screenSlide2"),
      document.getElementById("screenSlide3")
    ];
    const hudSteps = document.querySelectorAll(".hud-step");
    const hudProgressFill = document.getElementById("hudProgressFill");
    const deviceStatusPillText = document.querySelector("#deviceStatusPill .dsp-text");
    const ambientGlow = document.querySelector(".cinematic-ambient-glow");

    if (cinematicSection && deviceFrame && storySlides[0] && screenSlides[0]) {
      const isMobile = window.innerWidth <= 768;

      if (!isMobile) {
        const showcaseTL = gsap.timeline({
          scrollTrigger: {
            trigger: cinematicSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Fluid Apple-grade damping
            onUpdate: (self) => {
              const progress = self.progress;
              if (hudProgressFill) {
                hudProgressFill.style.height = `${Math.max(12, progress * 100)}%`;
              }
              // Active stage highlight
              let currentStage = 1;
              if (progress > 0.65) currentStage = 3;
              else if (progress > 0.32) currentStage = 2;

              hudSteps.forEach((step, idx) => {
                step.classList.toggle("active", idx + 1 === currentStage);
              });

              if (deviceStatusPillText && animationConfig.cinematicShowcase.stages[currentStage - 1]) {
                deviceStatusPillText.textContent = animationConfig.cinematicShowcase.stages[currentStage - 1].label;
              }
              if (ambientGlow && animationConfig.cinematicShowcase.stages[currentStage - 1]) {
                const color = animationConfig.cinematicShowcase.stages[currentStage - 1].glow;
                ambientGlow.style.background = `radial-gradient(circle at 60% 45%, ${color} 0%, rgba(129, 140, 248, 0.04) 40%, transparent 70%)`;
              }
            }
          }
        });

        // Initial state
        gsap.set(storySlides[0], { opacity: 1, y: 0 });
        gsap.set(screenSlides[0], { opacity: 1, scale: 1, y: 0 });
        gsap.set(storySlides[1], { opacity: 0, y: 40 });
        gsap.set(screenSlides[1], { opacity: 0, scale: 0.95, y: 25 });
        gsap.set(storySlides[2], { opacity: 0, y: 40 });
        gsap.set(screenSlides[2], { opacity: 0, scale: 0.95, y: 25 });

        // Stage 1 Entrance
        showcaseTL
          .fromTo(deviceFrame, { scale: 0.9, rotateY: 6, rotateX: 6, opacity: 0.8 }, { scale: 1, rotateY: 0, rotateX: 0, opacity: 1, duration: 0.2, ease: "power2.out" }, 0);

        // Stage 1 -> Stage 2 Transition (0.28 -> 0.54)
        showcaseTL
          // Fade/Slide out Stage 1
          .to(storySlides[0], { opacity: 0, y: -40, duration: 0.12, ease: "power2.in" }, 0.28)
          .to(screenSlides[0], { opacity: 0, scale: 0.92, y: -25, duration: 0.14, ease: "power2.in" }, 0.28)
          // 3D subtle tilt pulse on device frame
          .to(deviceFrame, { rotateY: -3, rotateX: 2, scale: 0.98, duration: 0.08, yoyo: true, repeat: 1 }, 0.32)
          // Fade/Slide in Stage 2
          .to(storySlides[1], { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.36)
          .to(screenSlides[1], { opacity: 1, scale: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.36);

        // Stage 2 -> Stage 3 Transition (0.62 -> 0.88)
        showcaseTL
          // Fade/Slide out Stage 2
          .to(storySlides[1], { opacity: 0, y: -40, duration: 0.12, ease: "power2.in" }, 0.62)
          .to(screenSlides[1], { opacity: 0, scale: 0.92, y: -25, duration: 0.14, ease: "power2.in" }, 0.62)
          // 3D subtle tilt pulse on device frame
          .to(deviceFrame, { rotateY: 3, rotateX: -2, scale: 0.98, duration: 0.08, yoyo: true, repeat: 1 }, 0.66)
          // Fade/Slide in Stage 3
          .to(storySlides[2], { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.70)
          .to(screenSlides[2], { opacity: 1, scale: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.70);

        // Smooth release transition at end of pinned showcase
        showcaseTL
          .to(deviceFrame, { scale: 0.96, opacity: 0.9, y: -20, duration: 0.1 }, 0.92);

        // Click HUD steps to scroll directly to stage
        hudSteps.forEach((step, idx) => {
          step.addEventListener("click", () => {
            const startScroll = cinematicSection.offsetTop;
            const totalHeight = cinematicSection.offsetHeight - window.innerHeight;
            const targetPos = startScroll + (totalHeight * (idx * 0.45));
            if (lenis) {
              lenis.scrollTo(targetPos, { duration: 1.2 });
            } else {
              window.scrollTo({ top: targetPos, behavior: "smooth" });
            }
          });
        });
      }
    }
  }

});

