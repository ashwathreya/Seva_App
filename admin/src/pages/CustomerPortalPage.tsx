import { useMemo, useState } from 'react';
import { useAdmin } from '../state';
import { analyzeUploads, toBookingPayload, type AiAnalysis } from '../services/aiService';

export default function CustomerPortalPage() {
  const { state, dispatch } = useAdmin();
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [submitted, setSubmitted] = useState('');
  const [providerId, setProviderId] = useState('');

  const customers = state.users.filter((u) => u.role === 'customer');
  const [customerId, setCustomerId] = useState(customers[0]?.id ?? '');
  const approvedPros = state.users.filter(
    (u) =>
      u.role === 'pro' &&
      u.vettingStatus === 'approved' &&
      u.accountStatus === 'active',
  );

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  const onPickFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles(Array.from(list));
    setAnalysis(null);
    setSubmitted('');
  };

  const runAi = async () => {
    if (!files.length) return;
    setBusy(true);
    setSubmitted('');
    try {
      const result = await analyzeUploads(files);
      setAnalysis(result);
      setCategory(result.category);
      setDescription(result.description);
      setPriceMin(result.priceMin);
      setPriceMax(result.priceMax);
    } finally {
      setBusy(false);
    }
  };

  const submitBooking = () => {
    if (!customerId || !category || !description) return;
    const avg = Math.round(((priceMin + priceMax) / 2) * 100);
    dispatch({
      type: 'CREATE_BOOKING',
      payload: toBookingPayload({
        customerId,
        category,
        description,
        imageUris: files.map((f) => f.name),
        estimateCents: avg,
      providerId,
      }),
    });
    setSubmitted(
      providerId
        ? 'Booking created and provider assigned. Check Admin > Bookings.'
        : 'Booking created and visible in Admin > Bookings.',
    );
  };

  return (
    <div>
      <h1 className="admin-h1">Customer web portal (desktop)</h1>
      <p className="admin-lead">
        Upload photos instead of camera. AI drafts the request, customer edits, then submits.
      </p>

      <div className="panel stack">
        <label className="filter">
          Customer
          <select
            className="input"
            value={customerId}
            onChange={(e) => setCustomerId(e.currentTarget.value)}>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.displayName}
              </option>
            ))}
          </select>
        </label>

        <label className="filter">
          Upload task photos
          <input
            type="file"
            className="input"
            multiple
            accept="image/*"
            onChange={(e) => onPickFiles(e.currentTarget.files)}
          />
        </label>

        {previews.length > 0 ? (
          <div className="preview-grid">
            {previews.map((url, idx) => (
              <img key={`${url}-${idx}`} src={url} alt={`upload-${idx}`} className="preview-img" />
            ))}
          </div>
        ) : null}

        <div className="row gap">
          <button type="button" className="btn btn-ok" onClick={runAi} disabled={!files.length || busy}>
            {busy ? 'Analyzing…' : 'Analyze with AI'}
          </button>
        </div>

        {analysis ? (
          <>
            <label className="filter">
              Category
              <input
                className="input"
                value={category}
                onChange={(e) => setCategory(e.currentTarget.value)}
              />
            </label>
            <label className="filter">
              Description
              <textarea
                className="input textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </label>
            <div className="row gap wrap">
              <label className="filter">
                Assign provider (optional)
                <select
                  className="input"
                  value={providerId}
                  onChange={(e) => setProviderId(e.currentTarget.value)}>
                  <option value="">Auto / unassigned</option>
                  {approvedPros.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.displayName}
                    </option>
                  ))}
                </select>
              </label>
              <label className="filter">
                Price min ($)
                <input
                  type="number"
                  className="input"
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.currentTarget.value || 0))}
                />
              </label>
              <label className="filter">
                Price max ($)
                <input
                  type="number"
                  className="input"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.currentTarget.value || 0))}
                />
              </label>
            </div>
            <button type="button" className="btn" onClick={submitBooking}>
              Confirm booking
            </button>
            {submitted ? <p className="small" style={{ color: '#1a7f37' }}>{submitted}</p> : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

