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
        img: "assets/projects/upi-fraud/dashboard.png",
        caption: "Power BI UPI Transaction Intelligence & Fraud Monitoring Analytics Dashboard",
        takeaways: [
          {
            title: "100K Transactions & ₹4.15M Volume",
            desc: "Comprehensive dataset modeling 100,000 transactions across Send (35K), Receive (35K), Merchant (25K), and Bill Pay."
          },
          {
            title: "2.00% Fraud Rate & 5.87% Failure Rate",
            desc: "Monitored merchant fraud counts (2,000) and regional risk distribution across West (2.09%), South (2.03%), and East."
          },
          {
            title: "1,408 High-Risk Customers Monitored",
            desc: "Flagged multi-factor anomaly triggers: Unusual Time (507), Suspicious Logins (498), and Frequent Failures (501)."
          }
        ]
      },
      architecture: {
        img: "assets/projects/upi-fraud/schema.png",
        caption: "Power BI UPI Star Schema Data Model & Entity-Relationship Architecture",
        cards: [
          {
            title: "Central Fact: upi_transaction_history",
            desc: "Stores 100K+ transaction records linked via 1:* relationships to Customers, Devices, Accounts, and Date dimension."
          },
          {
            title: "Dimensions: customer_master & device_info",
            desc: "Tracks customer demographic profiles, business user status, OS versions, rooted status, and device risk telemetry."
          },
          {
            title: "Risk & Feedback: fraud_alert_history & surveys",
            desc: "Monitors real-time fraud alert triggers, resolution turnaround times, customer feedback scores, and linked bank accounts."
          }
        ]
      },
      code: [
        {
          title: "DAX • Core KPIs & Transaction Volume Measures",
          code: `-- 1. Total Transactions Count
Total Transactions = COUNTROWS('UPI_Transactions')

-- 2. Total Transaction Amount (INR)
Total Transaction Amount = SUM('UPI_Transactions'[Amount])

-- 3. Average Transaction Value (ATV)
Average Transaction Value = 
DIVIDE(
    [Total Transaction Amount],
    [Total Transactions],
    0
)

-- 4. Total Distinct Customers Count
Total Customers = DISTINCTCOUNT('UPI_Transactions'[Customer_ID])

-- 5. Average Transactions per Customer Velocity
Avg Transactions per Customer = 
DIVIDE(
    [Total Transactions],
    [Total Customers],
    0
)

-- 6. Customer Satisfaction Index (Avg Rating)
Customer Satisfaction = AVERAGE('UPI_Transactions'[Satisfaction_Rating])

-- 7. Top Region by Total Transaction Volume
Top Region = 
CALCULATE(
    SELECTEDVALUE('UPI_Transactions'[Region]),
    TOPN(1, VALUES('UPI_Transactions'[Region]), [Total Transaction Amount], DESC)
)`
        },
        {
          title: "DAX • Fraud Detection & Channel Risk Analysis",
          code: `-- 8. Total Flagged Fraud Transactions Count
Total Fraud Txns = 
CALCULATE(
    [Total Transactions],
    'UPI_Transactions'[Is_Fraud] = 1
)

-- 9. System-Wide Fraud Rate Percentage
Fraud Rate % = 
DIVIDE(
    [Total Fraud Txns],
    [Total Transactions],
    0
) * 100

-- 10. Merchant Fraud Count
Merchant Fraud Count = 
CALCULATE(
    [Total Fraud Txns],
    'UPI_Transactions'[Transaction_Type] = "Merchant_Payment"
)

-- 11. Transaction Failure Rate Percentage
Transaction Failure Rate = 
VAR FailedTxns = 
    CALCULATE(
        [Total Transactions],
        'UPI_Transactions'[Status] = "Failed"
    )
RETURN
    DIVIDE(FailedTxns, [Total Transactions], 0) * 100

-- 12. Channel Fraud Rate (QR Code, App, Intent)
Fraud Rate by Channel % = 
DIVIDE(
    [Total Fraud Txns],
    CALCULATE([Total Transactions]),
    0
) * 100

-- 13. Device-Wise Fraud Proportion Percentage
Fraud Rate by Device % = 
DIVIDE(
    [Total Fraud Txns],
    CALCULATE([Total Fraud Txns], ALLSELECTED('UPI_Transactions'[Device_Type])),
    0
) * 100`
        },
        {
          title: "DAX • Customer Risk Scoring & Anomaly Classification",
          code: `-- 14. Customer Fraud Score Algorithm (Composite 0.0 to 1.0)
Customer Fraud Score = 
VAR CustomerTxns = [Total Transactions]
VAR CustomerFraud = [Total Fraud Txns]
VAR FailureCount = CALCULATE([Total Transactions], 'UPI_Transactions'[Status] = "Failed")
RETURN
    IF(
        CustomerTxns > 0,
        (CustomerFraud * 0.6) + (DIVIDE(FailureCount, CustomerTxns, 0) * 0.4),
        0
    )

-- 15. Customer Risk Tier Categorization
Customer Risk Category = 
SWITCH(
    TRUE(),
    [Customer Fraud Score] >= 0.70, "High Risk",
    [Customer Fraud Score] >= 0.35, "Medium Risk",
    "Low Risk"
)

-- 16. High Risk Customer Count Filter
High Risk Customers = 
CALCULATE(
    DISTINCTCOUNT('UPI_Transactions'[Customer_ID]),
    FILTER(
        VALUES('UPI_Transactions'[Customer_ID]),
        [Customer Fraud Score] >= 0.70 || [Total Fraud Txns] >= 5
    )
)`
        },
        {
          title: "SQL • High-Risk Transaction Extraction & Velocity Query",
          code: `SELECT 
    t.channel_type,
    t.device_type,
    COUNT(t.transaction_id) AS total_txns,
    SUM(t.amount_inr) AS total_volume_inr,
    ROUND(AVG(CASE WHEN t.status = 'FAILED' THEN 1.0 ELSE 0.0 END) * 100, 2) AS failure_rate_pct,
    ROUND(AVG(CASE WHEN t.is_flagged_fraud = 1 THEN 1.0 ELSE 0.0 END) * 100, 2) AS fraud_rate_pct,
    COUNT(DISTINCT CASE WHEN t.is_flagged_fraud = 1 THEN t.customer_id END) AS high_risk_customers
FROM fact_upi_transactions t
GROUP BY t.channel_type, t.device_type
ORDER BY fraud_rate_pct DESC;`
        }
      ],
      report: {
        problem: "Digital payment networks and UPI gateways handle high volumes of low-ticket transactions daily. Without automated anomaly scoring and real-time telemetry, detecting fraudulent chargebacks across diverse channels (QR Code, App, Intent) and devices (Feature Phones, Android, iOS) leads to financial leakage and customer friction.",
        approach: [
          "Modeled 100,000 UPI transactions (₹4.15M total volume) in Power BI with a dedicated DAX Measures calculation table covering 16 tailored risk and business metrics.",
          "Engineered multi-channel risk metrics tracking Failure Rates (5.87%), Fraud Rates (2.00%), and Channel/Device velocity distribution.",
          "Constructed Customer Fraud Scoring algorithms isolating 1,408 High-Risk Customers based on behavioral anomalies (Unusual Time, Suspicious Logins, Frequent Failures).",
          "Built 2 interactive dashboards: Executive Overview (KPIs, Gender, Region & Device volume) and Risk Monitoring Dashboard (Channel risk, Device risk, Anomaly treemap, Top 10 High-Risk Customer table)."
        ],
        impact: [
          "<strong>Actionable Channel Insights:</strong> Identified QR Code (2.10%) and App (2.02%) as highest fraud velocity channels, enabling proactive rule thresholds.",
          "<strong>Behavioral Anomaly Isolation:</strong> Pinpointed 507 Unusual Time spikes and 498 Suspicious Login events for automated 2FA step-up authentication.",
          "<strong>Executive Visibility & Reporting:</strong> Consolidated 16 DAX measures into executive reports with 1-click PDF download for executive stakeholder alignment."
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
        img: "assets/projects/black-friday/dashboard.png",
        caption: "Power BI Black Friday Sales Performance, Customer Segmentation & Product Intelligence Dashboards",
        takeaways: [
          {
            title: "₹5.10 Billion Gross Sales & 6K Customers",
            desc: "Analyzed 6,000 unique buyers across City Tiers A, B, and C with ₹865.02K average purchase per customer."
          },
          {
            title: "55% High-Value Revenue Contribution (Pareto Pattern)",
            desc: "Top 20% premium customers (1.2K) generate ₹2.82bn (55.36%) of total gross sales."
          },
          {
            title: "Category & Behavior Intelligence",
            desc: "Identified Product Categories 18, 9, and 11 with >60% premium penetration and strong repeat loyalty among working professionals (26-45 age group)."
          }
        ]
      },
      architecture: {
        img: "assets/projects/black-friday/datamodel.png",
        caption: "Power BI Sales Fact & Specialized DAX Calculation Tables Architecture",
        cards: [
          {
            title: "Central Fact: Sales Table",
            desc: "Contains transaction purchases, user IDs, product IDs, marital status, stay years, city categories, and customer types."
          },
          {
            title: "DAX Measure Groups & Calculation Tables",
            desc: "Structured into dedicated calculation tables: Executive KPIs, Segmentation Measures, Product Intelligence, and Supporting Metrics."
          },
          {
            title: "Segmentation & Dynamic Ranking Tables",
            desc: "Computes dynamic Pareto thresholds (Top 20% Cutoff), High-Value flags, repeat buyer rates, and customer ranking."
          }
        ]
      },
      code: [
        {
          title: "DAX • Executive KPIs & Sales Performance Measures",
          code: `-- 1. Total Gross Sales Amount
Total Sales = SUM('Sales'[Purchase])

-- 2. Total Distinct Customer Count
Total Customers = DISTINCTCOUNT('Sales'[User_ID])

-- 3. Average Purchase Amount per Customer
Avg Purchase/Customer = 
DIVIDE(
    [Total Sales],
    [Total Customers],
    0
)

-- 4. High-Value Customer Revenue Contribution % (Pareto Index)
HighValue Contribution % = 
DIVIDE(
    [HighValue Revenue],
    [Total Sales],
    0
)

-- 5. High-Value Customer Count
HighValue Customers = 
CALCULATE(
    [Total Customers],
    'Sales'[Customer Type] = "HighValue"
)`
        },
        {
          title: "DAX • Customer Segmentation & Repeat Behavior Measures",
          code: `-- 6. Dynamic Customer Rank by Monetary Spend
Customer Rank = 
RANKX(
    ALL('Sales'[User_ID]),
    [Total Sales],
    ,
    DESC,
    Dense
)

-- 7. Top 20% Pareto Cutoff Threshold
Top 20 Cutoff = [Total Customers] * 0.20

-- 8. Dynamic High-Value vs. Low-Value Customer Flag
HighValue Flag = 
IF(
    [Customer Rank] <= [Top 20 Cutoff],
    "HighValue",
    "LowValue"
)

-- 9. Repeat Customer Purchase Rate Percentage
Repeat Rate % = 
DIVIDE(
    [Repeat_Customers],
    [Total Customers],
    0
) * 100`
        },
        {
          title: "DAX • Product Intelligence & Category Penetration",
          code: `-- 10. High-Value Product Category Revenue Penetration %
High-Value Revenue Penetration % = 
DIVIDE(
    CALCULATE([HighValue Revenue]),
    CALCULATE([Total Product Revenue]),
    0
)

-- 11. Average Revenue Generated per Product SKU
Avg Revenue per Product = 
DIVIDE(
    [Total Product Revenue],
    [Total Products Sold],
    0
)

-- 12. Category 1 Revenue Contribution Share
Product_Category1_Contribution% = 
DIVIDE(
    CALCULATE([Total Sales], 'Sales'[Product_Category_1] = 1),
    [Total Sales],
    0
) * 100`
        },
        {
          title: "SQL • Customer Pareto Percentile & Spend Segmentation",
          code: `WITH CustomerSpend AS (
    SELECT 
        user_id,
        city_category,
        age,
        SUM(purchase) AS total_spend,
        COUNT(product_id) AS total_items,
        DENSE_RANK() OVER (ORDER BY SUM(purchase) DESC) AS spend_rank,
        PERCENT_RANK() OVER (ORDER BY SUM(purchase) DESC) AS spend_percentile
    FROM sales
    GROUP BY user_id, city_category, age
)
SELECT 
    user_id,
    city_category,
    age,
    total_spend,
    total_items,
    CASE 
        WHEN spend_percentile <= 0.20 THEN 'HighValue (Top 20%)' 
        ELSE 'LowValue (Bottom 80%)' 
    END AS customer_segment
FROM CustomerSpend
ORDER BY total_spend DESC;`
        }
      ],
      report: {
        problem: "Retail leadership needed granular customer segmentation and SKU rationalization during high-volume Black Friday campaigns to prevent margin dilution from untargeted blanket discounts and optimize promotional spend.",
        approach: [
          "Analyzed ₹5.10 Billion sales transaction data across 6,000 customers, 4,000 product SKUs, and 20 product categories in Power BI.",
          "Engineered multi-table DAX architectures isolating Executive KPIs, Customer Segmentation, Product Intelligence, and Actionable Strategy.",
          "Formulated a Pareto customer tier (Top 20% vs. Bottom 80%) and mapped demographic purchasing vectors across City Category (B at 41.5%), Age cohorts (26-35 at ₹2.03bn), and Marital Status.",
          "Evaluated category-level premium revenue penetration to isolate high-affinity product clusters (Categories 18, 9, 11 >60% penetration)."
        ],
        impact: [
          "<strong>Pareto Revenue Optimization:</strong> Proven that 20% high-value customers contribute 55.36% (₹2.82bn) of total revenue, enabling targeted VIP retention.",
          "<strong>High-Yield Category Allocation:</strong> Prioritized inventory for Categories 18, 9, and 11, maximizing high-margin promotional ROI.",
          "<strong>Actionable Retention Framework:</strong> Designed age-cohort loyalty strategies (26-45 working professionals) and SKU rationalization plans to eliminate low-performing products."
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

});

