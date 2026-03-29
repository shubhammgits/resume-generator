import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(elementId: string, fileName: string): Promise<void> {
  const target = document.getElementById(elementId);

  if (!target) {
    throw new Error(`Element with id '${elementId}' not found`);
  }

  const previousVisibility = target.style.visibility;
  const previousLeft = target.style.left;

  try {
    target.style.visibility = "visible";
    target.style.left = "0";

    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let renderedHeight = 0;
    let pageIndex = 0;

    while (renderedHeight < imgHeight) {
      if (pageIndex > 0) {
        pdf.addPage();
      }

      const positionY = -renderedHeight;
      pdf.addImage(imgData, "PNG", 0, positionY, imgWidth, imgHeight, undefined, "FAST");

      renderedHeight += pageHeight;
      pageIndex += 1;
    }

    pdf.save(fileName);
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to generate PDF");
  } finally {
    target.style.visibility = previousVisibility;
    target.style.left = previousLeft;
  }
}
