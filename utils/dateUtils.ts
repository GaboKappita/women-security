/**
 * Obtiene la fecha y hora actual en el formato "YYYY-MM-DD HH:mm:ss".
 * @returns {string} La fecha y hora actual formateada.
 */
export const obtenerFechaActual = (): string => {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const segundos = String(fecha.getSeconds()).padStart(2, "0");
  return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
};

export const obtenerFechaEntregada = (fecha_entregada: any): string => {
  const fecha = new Date(fecha_entregada);
  const dia = fecha.getUTCDate().toString().padStart(2, "0");
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  const anio = fecha.getUTCFullYear();
  return `${dia}/${mes}/${anio}`;
};
