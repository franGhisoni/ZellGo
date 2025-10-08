import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import employeeService from '../../services/employeeService'
import './EmployeeProfile.css'

function formatDate(iso) {
  if (!iso) return '-';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
}

function extractDriveId(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/');
    const idx = parts.findIndex((p) => p === 'd');
    const qId = u.searchParams.get('id');
    return (idx !== -1 && parts[idx + 1]) ? parts[idx + 1] : qId;
  } catch {
    return null;
  }
}

function toDirectDriveUrl(url) {
  if (!url) return url;
  try {
    const u = new URL(url);
    // Variantes comunes de Drive → generar uc?export=view&id=<ID>
    const parts = u.pathname.split('/');
    const idx = parts.findIndex((p) => p === 'd');
    const qId = u.searchParams.get('id');
    const fileId = (idx !== -1 && parts[idx + 1]) ? parts[idx + 1] : qId;
    if (u.hostname.includes('drive.google.com') && fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    // Si ya es uc o es otro host, devolver tal cual
    return url;
  } catch {
    return url;
  }
}

function buildDriveCandidates(originalUrl) {
  const id = extractDriveId(originalUrl);
  if (!id) return [originalUrl];
  return [
    `https://drive.google.com/uc?export=view&id=${id}`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w2000`,
    `https://lh3.googleusercontent.com/d/${id}=w2000`,
  ];
}

function MiniAvatar({ url, label }) {
  const [failed, setFailed] = useState(!url);
  const initial = (label || 'E').charAt(0);
  return (
    <div className="emp-avatar mini">
      {!failed && url ? (
        <img src={url} alt={label || 'Avatar'} onError={() => setFailed(true)} />
      ) : (
        <div className="emp-avatar-fallback">{initial}</div>
      )}
    </div>
  );
}

export default function EmployeeProfile() {
  const { codigo } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [empleado, setEmpleado] = useState(null);
  const [debug, setDebug] = useState(null);
  const [subordinates, setSubordinates] = useState([]);
  const [ventasCount, setVentasCount] = useState(0);

  useEffect(() => {
    // activar fondo de perfil con la misma imagen del Hero (unsplash)
    document.body.classList.add('profile-bg');
    return () => {
      document.body.classList.remove('profile-bg');
      document.body.style.backgroundImage = '';
    };
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    const load = /^[A-Za-z]+\d+$/i.test(codigo)
      ? employeeService.getByCodigo(codigo)
      : (/^\d+$/.test(codigo)
          ? employeeService.getById(Number(codigo))
          : employeeService.getByCodigo(codigo));

    load
      .then(async (data) => {
        // Guarda debug para imprimir fácilmente
        setDebug(data);
        try { console.debug('Empleado API data', data); } catch {}
        if (!active) return;
        if (!data) {
          setError('Empleado no encontrado');
        }
        setEmpleado(data || null);
        if (data?.id) {
          // Cargar subordinados y supervisor garantizando ambos lados, contar ventas reales
          const [subs, ventas, sup] = await Promise.all([
            employeeService.getSubordinates(data.id),
            employeeService.getVentasCount(data.id),
            data.supervisor ? Promise.resolve(null) : employeeService.getSupervisorFor(data.id),
          ]);
          if (!active) return;
          setSubordinates(subs);
          setVentasCount(ventas);
          if (!data.supervisor && sup) {
            setEmpleado((prev) => prev ? { ...prev, supervisor: sup } : prev);
          }
        }
      })
      .catch((e) => setError(e?.message || 'Error cargando empleado'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [codigo]);

  const driveCandidates = useMemo(() => {
    if (!empleado?.foto_url) return [];
    const id = extractDriveId(empleado.foto_url);
    const api = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    const viaProxy = id && api ? [`${api}/image-proxy?id=${id}`] : [];
    return [...viaProxy, ...buildDriveCandidates(empleado.foto_url)];
  }, [empleado]);
  const [imgSrcIndex, setImgSrcIndex] = useState(0);
  useEffect(() => { setImgSrcIndex(0); }, [driveCandidates.join('|')]);

  if (loading) {
    return <div className="emp-container"><Navbar /><p>Cargando...</p></div>
  }

  if (error) {
    return <div className="emp-container"><p className="emp-error">{error}</p></div>
  }

  if (!empleado) {
    return <div className="emp-container"><Navbar /><p>No hay datos</p></div>
  }

  const supervisor = empleado.supervisor;
  const subordinados = (subordinates && subordinates.length ? subordinates : (empleado.subordinados || [])).map((s) => ({
    id: s?.id,
    nombre_completo: s?.nombre_completo || s?.attributes?.nombre_completo,
    alias: s?.alias || s?.attributes?.alias,
    codigo_vendedor: s?.codigo_vendedor || s?.attributes?.codigo_vendedor,
    foto_url: s?.foto_url || s?.attributes?.foto_url,
    documentId: s?.documentId || s?.attributes?.documentId,
  }));

  return (
    <div className="emp-container">
      <Navbar />
      <div className="emp-layout">
        <div className="emp-left">
          <header className="emp-header">
            <div className="emp-avatar">
          {driveCandidates.length ? (
            <img src={driveCandidates[Math.min(imgSrcIndex, driveCandidates.length - 1)]}
                 alt={`Foto de ${empleado.nombre_completo || empleado.alias || empleado.codigo_vendedor || 'empleado'}`}
                 referrerPolicy="no-referrer"
                 crossOrigin="anonymous"
                 onError={() => {
                   if (imgSrcIndex < driveCandidates.length - 1) {
                     setImgSrcIndex((i) => i + 1);
                   }
                 }} />
          ) : (
            <div className="emp-avatar-fallback">{(empleado.nombre_completo || 'E').charAt(0)}</div>
          )}
            </div>
            <div className="emp-head-info">
              <h1>{empleado.nombre_completo || empleado.alias || empleado.codigo_vendedor || 'Empleado'}</h1>
            </div>
          </header>
        </div>

        <section className="emp-right">
          <div className="emp-grid">
        <div className="emp-card">
          <h2>Datos de contacto</h2>
          <ul className="emp-list">
            <li><strong>DNI:</strong> {empleado.dni ?? '-'}</li>
            <li><strong>Teléfono:</strong> {empleado.telefono ?? '-'}</li>
            <li><strong>Email:</strong> {empleado.email ?? '-'}</li>
            <li><strong>Ingreso:</strong> {formatDate(empleado.fecha_ingreso)}</li>
            <li><strong>Egreso:</strong> {formatDate(empleado.fecha_egreso)}</li>
          </ul>
        </div>

            <div className="emp-card">
              <h2>Superior</h2>
              {supervisor ? (
                <Link to={`/empleado/${supervisor?.codigo_vendedor || ''}`} className="emp-superior">
                  <MiniAvatar url={supervisor?.foto_url} label={supervisor?.nombre_completo || 'S'} />
                  <div>
                    <div className="emp-name">{supervisor?.nombre_completo || '—'}</div>
                    <div className="emp-dni">DNI: {supervisor?.dni || '—'}</div>
                  </div>
                </Link>
              ) : (
                <p>Sin superior.</p>
              )}
            </div>

            <div className="emp-card">
              <h2>Equipo</h2>
              {subordinados.length ? (
                <ul className="emp-people">
                  {subordinados.map((sub) => (
                    <li key={sub.id}>
                      <Link to={`/empleado/${sub.codigo_vendedor || sub.documentId || sub.id}`} className="emp-superior">
                        <MiniAvatar url={sub?.foto_url} label={sub?.nombre_completo || sub?.alias || 'E'} />
                        <span className="emp-name">{sub?.nombre_completo || sub?.alias || sub?.codigo_vendedor || ''}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Sin equipo a cargo.</p>
              )}
            </div>

        <div className="emp-card">
          <h2>Ventas</h2>
          <p><strong>Total de ventas:</strong> {ventasCount ?? empleado.totalVentas ?? 0}</p>
        </div>
          </div>
        </section>
      </div>
    </div>
  )
}


