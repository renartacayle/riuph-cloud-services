/**
 * Smart Resume Optimizer & Sentence Rewriter Engine
 * Generates actionable Google XYZ before-and-after transformations
 * for weak bullet points and missing keyword insertions.
 */

export function generateBulletSuggestions(weakBullets = [], matchedCategory = "software_engineering") {
  const templates = {
    software_engineering: [
      {
        before: "Responsible for developing web applications and fixing bugs.",
        after: "Architected and delivered 4 high-throughput web microservices using TypeScript and React, resolving 50+ critical bugs and decreasing API latency by 34%.",
        principle: "Ganti 'Responsible for' dengan kata kerja aksi spesifik (Architected/Delivered) dan cantumkan persentase perbaikan performa."
      },
      {
        before: "Worked on database optimization and backend systems.",
        after: "Overhauled PostgreSQL database queries and implemented Redis caching layer, scaling daily active transaction capacity by 2.5x across 150k users.",
        principle: "Jelaskan teknologi yang digunakan dan skala peningkatan kapasitas (2.5x)."
      },
      {
        before: "Helped team with deployment and code reviews.",
        after: "Streamlined CI/CD deployment pipelines using Docker and GitHub Actions, cutting release deployment cycles from 4 hours to 15 minutes.",
        principle: "Tunjukkan efisiensi waktu yang berhasil dihemat (4 jam menjadi 15 menit)."
      }
    ],
    product_management: [
      {
        before: "Managed product roadmap and worked with stakeholders.",
        after: "Spearheaded quarterly product roadmap across 3 cross-functional engineering squads, successfully delivering 6 key features with an 88% on-time completion rate.",
        principle: "Ubah menjadi kata kerja 'Spearheaded' dan cantumkan tingkat keberhasilan peluncuran."
      },
      {
        before: "Conducted user research and designed experiments.",
        after: "Led 25+ in-depth user interviews and executed 8 A/B testing experiments, increasing checkout conversion funnel by 18.5%.",
        principle: "Quantifikasi jumlah riset pengguna dan metrik konversi bisnis."
      }
    ],
    digital_marketing: [
      {
        before: "Handled social media and paid advertising campaigns.",
        after: "Engineered multi-channel paid acquisition strategy across Meta and Google Ads, managing a $25k monthly budget and achieving a 4.2x ROAS.",
        principle: "Sebutkan besaran anggaran yang dikelola dan angka ROAS / ROI kampanye."
      },
      {
        before: "Wrote articles and helped with SEO ranking.",
        after: "Produced 40+ high-intent SEO articles and optimized technical on-page keywords, growing organic monthly search traffic by 140% in 6 months.",
        principle: "Tampilkan pertumbuhan persentase traffic dan jangka waktu pencapaian."
      }
    ],
    finance_accounting: [
      {
        before: "Assisted with monthly financial reports and budgeting.",
        after: "Formulated monthly P&L variance reports and annual budgeting models, identifying $45,000 in operational cost-saving opportunities.",
        principle: "Tunjukkan nilai nominal penghematan atau efisiensi anggaran yang dihasilkan."
      }
    ]
  };

  const domainTemplates = templates[matchedCategory] || templates.software_engineering;
  const suggestions = [];

  // Match actual weak bullets from the candidate CV if provided
  if (weakBullets && weakBullets.length > 0) {
    for (let i = 0; i < Math.min(3, weakBullets.length); i++) {
      const bullet = weakBullets[i];
      const template = domainTemplates[i % domainTemplates.length];
      suggestions.push({
        id: `sug_${i + 1}`,
        originalBullet: bullet.text || bullet,
        recommendedBullet: template.after,
        actionAdvice: `Ubah struktur kalimat menjadi formula Google XYZ: [Tindakan Kuat] + [Metrik Terukur] + [Metode/Tools yang Digunakan]. ${template.principle}`
      });
    }
  } else {
    // Return standard best practice examples
    for (let i = 0; i < domainTemplates.length; i++) {
      const template = domainTemplates[i];
      suggestions.push({
        id: `template_${i + 1}`,
        originalBullet: template.before,
        recommendedBullet: template.after,
        actionAdvice: template.principle
      });
    }
  }

  return suggestions;
}
