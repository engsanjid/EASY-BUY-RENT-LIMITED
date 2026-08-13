// src/utils/generatePaymentPDF.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Customer } from "@/types/Customer";

export function generatePaymentPDF(customer: Customer) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Easy Buy & Rent Limited", 14, 18);

  doc.setFontSize(11);
  doc.text("Payment History Statement", 14, 26);

  doc.setFontSize(10);
  doc.text(`Customer: ${customer.name}`, 14, 36);
  doc.text(`Phone: ${customer.phone}`, 14, 42);

  if (customer.vehicleName) {
    doc.text(`Vehicle: ${customer.vehicleName}`, 14, 48);
  }

  const ownershipLabel =
    customer.ownershipStatus === "owned"
      ? "Owned (Loan Fully Repaid)"
      : customer.ownershipStatus === "renting"
      ? "Renting"
      : "No Vehicle Assigned";

  doc.text(`Ownership Status: ${ownershipLabel}`, 14, 54);

  doc.text(`Weekly Rent: £${customer.weeklyRentAmount}`, 14, 64);
  doc.text(`Total Rent Paid: £${customer.totalRentPaid}`, 110, 64);

  doc.text(`Loan Amount: £${customer.loanAmount}`, 14, 70);
  doc.text(`Loan Repaid: £${customer.loanRepaid}`, 110, 70);
  doc.text(`Loan Outstanding: £${customer.loanOutstanding}`, 14, 76);

  const rows = customer.paymentHistory.map((p) => [
    p.type === "loan"
      ? "Loan Repayment"
      : `Rent${p.week ? ` (Week ${p.week})` : ""}`,
    `£${p.amount}`,
    p.date,
    p.status,
  ]);

  autoTable(doc, {
    startY: 86,
    head: [["Type", "Amount", "Date", "Status"]],
    body: rows,
    headStyles: { fillColor: [234, 179, 8] },
  });

  doc.save(`${customer.name.replace(/\s+/g, "_")}_payment_history.pdf`);
}