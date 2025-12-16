// LOGIN Y LOGOUT
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

document.getElementById("logout").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
});

// VARIABLES
const step1 = document.getElementById("step-1");
const step2Fisica = document.getElementById("step-2-fisica");
const step2Juridica = document.getElementById("step-2-juridica");
const stepResult = document.getElementById("step-result");
const listaDocumentacion = document.getElementById("listaDocumentacion");

// FUNCIONES AUXILIARES 
function eliminarDuplicados(arr) {
  return [...new Set(arr)];
}

function mostrarDocumentacion(arr) {
  listaDocumentacion.innerHTML = "";
  arr.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    listaDocumentacion.appendChild(li);
  });
}

// NAVEGACIÓN 
document.getElementById("btnSiguienteInterviniente").addEventListener("click", () => {
  const tipo = document.getElementById("tipoInterviniente").value;
  if (!tipo) return alert("Seleccione una opción");
  
  step1.classList.remove("active");
  if (tipo === "fisica") {
    step2Fisica.classList.add("active");
  } else {
    step2Juridica.classList.add("active");
  }
});

document.getElementById("btnVolverFisica").addEventListener("click", () => {
  step2Fisica.classList.remove("active");
  step1.classList.add("active");
});

document.getElementById("btnVolverJuridica").addEventListener("click", () => {
  step2Juridica.classList.remove("active");
  step1.classList.add("active");
});

document.getElementById("btnVolverInicio").addEventListener("click", () => {
  stepResult.classList.remove("active");
  step1.classList.add("active");
});

//  GENERAR DOCUMENTACIÓN PF 
document.getElementById("btnProcesarFisica").addEventListener("click", () => {
  let documentacion = ["DNI", "KYC PF"];
  const estado = document.getElementById("estadoCivil").value;
  if (estado === "gananciales") documentacion.push("DNI DEL CÓNYUGE");

  const tipoDoc = document.getElementById("tipoDocumento").value;
  if (tipoDoc === "dni") {
    documentacion.push("CERTIFICADO DE TITULARIDAD DE LA CUENTA DE PAGO", "CERTIFICADO DE SALDO DE LA CUENTA DE PAGO");
  } else if (tipoDoc === "nie") {
    documentacion.push("CERTIFICADO DE TITULARIDAD DE LA CUENTA DE PAGO", "EXTRACTO DE LA CUENTA DE PAGO DE LOS ÚLTIMOS 90 DÍAS");
  }

  const actividades = Array.from(document.querySelectorAll("input[name=actividad]:checked")).map(i => i.value);
  if (actividades.length > 0) {
    documentacion.push("ÚLTIMO IRPF", "VIDA LABORAL");
    if (actividades.includes("cuentaAjena")) documentacion.push("3 ÚLTIMAS NÓMINAS");
    if (actividades.includes("cuentaPropia")) {
      documentacion.push("ÚLTIMOS PAGOS DE AUTÓNOMO", "ÚLTIMO MODELO 390", "MODELOS 303 DEL AÑO EN CURSO", "MODELOS 130/131 DEL AÑO EN CURSO (EN CASO DE NO REALIZAR IVA)");
    }
    if (actividades.includes("pensionista")) documentacion.push("CERTIFICADO DE REVALORIZACIÓN DE LA PENSIÓN");
    if (actividades.includes("sinActividad")) {
      documentacion.push("CERTIFICADO DE CONCESIÓN DEL DESEMPLEO (EN CASO DE ESTAR COBRÁNDOLO)", "EXTRACTO DE LA CUENTA DE PAGO DE LOS ÚLTIMOS 90 DÍAS");
    }
  }

  const origenes = Array.from(document.querySelectorAll("input[name=origen]:checked")).map(i => i.value);
  origenes.forEach(valor => {
    if (["venta", "herencia", "rescate", "prima", "bancario"].includes(valor)) {
        const labels = {
            venta: ["ESCRITURA DE VENTA", "JUSTIFICANTE DE INGRESO DE LA VENTA"],
            herencia: ["ESCRITURA DE HERENCIA", "JUSTIFICANTE DE INGRESO DE LA HERENCIA"],
            rescate: ["DOCUMENTO DEL RESCATE", "JUSTIFICANTE DEL INGRESO DEL RESCATE"],
            prima: ["DOCUMENTO DE LA PRIMA", "JUSTIFICANTE DEL INGRESO DE LA PRIMA"],
            bancario: ["PÓLIZA/CONTRATO DE PRÉSTAMO FIRMADO", "JUSTIFICANTE DE INGRESO DEL PRÉSTAMO"]
        };
        documentacion.push(...labels[valor], "TRAZABILIDAD HASTA LA CUENTA DE PAGO SI NO SE INGRESÓ AHÍ");
    }
    if (valor === "hipotecario") documentacion.push("FEIN FIRMADA");
    if (valor === "pf") documentacion.push("CONTRATO/ESCRITURA DE PRÉSTAMO/DONACIÓN", "JUSTIFICANTE EN DETALLE, CON CUENTA ORIGEN Y DESTINO, DEL TRASPASO DE FONDOS", "TODA LA DOCUMENTACIÓN APLICABLE AL PRESTAMISTA COMO INTERVINIENTE PERSONA FÍSICA (RELLENAR NUEVO FORMULARIO)");
    if (valor === "pj") documentacion.push("CONTRATO/ESCRITURA DE PRÉSTAMO/DONACIÓN", "JUSTIFICANTE EN DETALLE, CON CUENTA ORIGEN Y DESTINO, DEL TRASPASO DE FONDOS", "TODA LA DOCUMENTACIÓN APLICABLE AL PRESTAMISTA COMO INTERVINIENTE PERSONA JURÍDICA (RELLENAR NUEVO FORMULARIO)");
  });

  const final = eliminarDuplicados(documentacion);
  step2Fisica.classList.remove("active");
  stepResult.classList.add("active");
  mostrarDocumentacion(final);
});

// GENERAR DOCUMENTACIÓN PJ 
document.getElementById("btnProcesarJuridica").addEventListener("click", () => {
  let documentacion = [
    "CIF", "ESCRITURA DE CONSTITUCIÓN Y SUBSIGUIENTES HASTA LA CONFIGURACIÓN ACTUAL",
    "KYC PJ", "ATR", "ANEXO 6", "DNI's DE TODOS LOS ADMINISTRADORES Y TITULARES REALES",
    "ÚLTIMO MODELO 200", "ÚLTIMO MODELO 390", "MODELOS 303 DEL AÑO EN CURSO"
  ];

  if (document.getElementById("sociedadReciente").value === "si") {
    documentacion.push("CERTIFICADO DE TITULARIDAD DE LA CUENTA DE PAGO", "EXTRACTO DE LA CUENTA DE PAGO DE LOS ÚLTIMOS 90 DÍAS");
  } else if (document.getElementById("sociedadReciente").value === "no") {
    documentacion.push("CERTIFICADO DE TITULARIDAD DE LA CUENTA DE PAGO", "CERTIFICADO DE SALDO DE LA CUENTA DE PAGO");
  }

  const origenes = Array.from(document.querySelectorAll("input[name=origenJ]:checked")).map(i => i.value);
  origenes.forEach(valor => {
    switch(valor){
      case "venta": documentacion.push("ESCRITURA DE VENTA","JUSTIFICANTE DE INGRESO DE LA VENTA","TRAZABILIDAD HASTA LA CUENTA DE PAGO SI NO SE INGRESÓ AHÍ"); break;
      case "capital": documentacion.push("ESCRITURA/ACUERDOS DEL AUMENTO DE CAPITAL","JUSTIFICANTE DE INGRESO DEL AUMENTO DE CAPITAL","TRAZABILIDAD HASTA LA CUENTA DE PAGO SI NO SE INGRESÓ AHÍ"); break;
      case "aportacion": documentacion.push("ACUERDO SOBRE LA APORTACIÓN DE LOS SOCIOS", "JUSTIFICANTE EN DETALLE, CON CUENTA ORIGEN Y DESTINO, DEL INGRESO DE LAS APORTACIONES", "TRAZABILIDAD HASTA LA CUENTA DE PAGO SI NO SE INGRESÓ AHÍ", "TODA LA DOCUMENTACIÓN APLICABLE AL APORTANTE COMO INTERVINIENTE PERSONA FÍSICA (RELLENAR NUEVO FORMULARIO)"); break;
      case "rescate": documentacion.push("DOCUMENTO DEL RESCATE","JUSTIFICANTE DEL INGRESO DEL RESCATE","TRAZABILIDAD HASTA LA CUENTA DE PAGO SI NO SE INGRESÓ AHÍ"); break;
      case "hipotecario": documentacion.push("FEIN FIRMADA"); break;
      case "bancario": documentacion.push("PÓLIZA/CONTRATO DE PRÉSTAMO FIRMADO","JUSTIFICANTE DE INGRESO DEL PRÉSTAMO","TRAZABILIDAD HASTA LA CUENTA DE PAGO SI NO SE INGRESÓ AHÍ"); break;
      case "pf": documentacion.push("CONTRATO/ESCRITURA DE PRÉSTAMO/DONACIÓN","JUSTIFICANTE EN DETALLE, CON CUENTA ORIGEN Y DESTINO, DEL TRASPASO DE FONDOS","TODA LA DOCUMENTACIÓN APLICABLE AL PRESTAMISTA COMO INTERVINIENTE PERSONA FÍSICA (RELLENAR NUEVO FORMULARIO)"); break;
      case "pj": documentacion.push("CONTRATO/ESCRITURA DE PRÉSTAMO/DONACIÓN","JUSTIFICANTE EN DETALLE, CON CUENTA ORIGEN Y DESTINO, DEL TRASPASO DE FONDOS","TODA LA DOCUMENTACIÓN APLICABLE AL PRESTAMISTA COMO INTERVINIENTE PERSONA JURÍDICA (RELLENAR NUEVO FORMULARIO)"); break;
    }
  });

  const final = eliminarDuplicados(documentacion);
  step2Juridica.classList.remove("active");
  stepResult.classList.add("active");
  mostrarDocumentacion(final);
});

//  EXPORTAR PDF 
document.getElementById("btnPDF").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.text("Documentación requerida", 20, 20);
  const items = document.querySelectorAll("#listaDocumentacion li");
  let y = 30;
  items.forEach(item => {
    pdf.text("- " + item.textContent, 20, y);
    y += 10;
  });
  pdf.save("documentacion.pdf");
});

// EXPORTAR EXCEL 
document.getElementById("btnExcel").addEventListener("click", () => {
  const items = Array.from(document.querySelectorAll("#listaDocumentacion li")).map(li => [li.textContent]);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([["Documento"], ...items]);
  XLSX.utils.book_append_sheet(wb, ws, "Lista");
  XLSX.writeFile(wb, "documentacion.xlsx");
});


