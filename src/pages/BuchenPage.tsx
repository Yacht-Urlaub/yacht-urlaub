import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function BuchenPage() {
  useEffect(() => {
    window.scrollTo(0, 0)

    const head = document.head

    const addLink = (href: string) => {
      if (document.querySelector(`link[href="${href}"]`)) return
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.type = 'text/css'
      head.appendChild(link)
    }

    const addScript = (src: string): Promise<void> =>
      new Promise(resolve => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
        const s = document.createElement('script')
        s.src = src
        s.type = 'text/javascript'
        s.onload = () => resolve()
        s.onerror = () => resolve()
        head.appendChild(s)
      })

    addLink('https://www.planyo.com/Plugins/PlanyoFiles/bootstrap-planyo.min.css')
    addLink('https://www.planyo.com/schemes/?calendar=46954&detect_mobile=auto&sel=scheme_css')
    addLink('https://www.planyo.com/li.css')

    addScript('https://www.planyo.com/utils.js')
      .then(() => addScript('https://www.planyo.com/wrappers.js'))
      .then(() => addScript('https://www.planyo.com/li.js?v=3'))
      .then(() => addScript('https://www.planyo.com/verify-search-fields.js'))
  }, [])

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--gray-light)' }}>
      <SEO
        title="Jetzt buchen – Yachturlaub anfragen | Yacht-Urlaub"
        description="Yachturlaub direkt online buchen: Wählen Sie Startdatum und Dauer und finden Sie die passende Yacht für Ihren Traumurlaub."
        canonical="/buchen"
      />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '3rem 0 3.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}
          >
            Jetzt buchen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}
          >
            Finde deine Traumyacht
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}
          >
            Wähle dein Startdatum und die gewünschte Reisedauer — wir zeigen dir alle verfügbaren Yachten.
          </motion.p>
        </div>
      </div>

      {/* Widget */}
      <div className="container" style={{ maxWidth: '960px', padding: '3rem 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{
            background: '#fff',
            borderRadius: '6px',
            boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
            padding: '2.5rem',
          }}
        >
          <div
            id="planyo_search_widget"
            className="planyo horizontal-widget"
            dangerouslySetInnerHTML={{
              __html: `
<style>
.horizontal-widget .planyo-form-item-group {margin-right:30px;}
.horizontal-widget .planyo-form-item-group label {margin-right:10px;}
.horizontal-widget #res_form_buttons {display:inline-block;}
#search_form label {display:block;float:none;width:100%}
form#search_form li.planyo_static_help {margin-left:0px;}
</style>
<div style='position:absolute;visibility:hidden;z-index:5000;' class='picker_dropdown' id='box_start_datecal'
  onmousedown='var e=arguments[0]||window.event;e.stopPropagation();'
  onclick='var e=arguments[0]||window.event;e.stopPropagation();'></div>

<form id='box_search_form' name='search_form' class='title_above form-inline' action='https://www.planyo.com/booking.php'
  role='form' target='planyo_li_iframe' onsubmit="return planyo_li_on_submit_form()" method='get'
  style="text-align:center;">
  <input type='hidden' value="46954" id='calendar' name='calendar' />
  <div class='form-group planyo-form-item-group datefld single-col' id='row_box_start_date'>
    <label class='control-label'>Startdatum<em>*</em></label>
    <div class='input-group'>
      <input class='with-status-border form-control' type='text' id='box_start_date' name='box_start_date'
        autocomplete='off' value=""
        onfocus="planyo_close_calendar();planyo_show_calendar('box_start_date',null);"
        onmousedown="var e=arguments[0]||window.event;e.stopPropagation();"
        onclick="var e=arguments[0]||window.event;e.stopPropagation();" />
      <span class='input-group-addon' onclick="planyo_close_calendar();planyo_show_calendar('box_start_date',null);">
        <span class='input-group-text'>
          <a class='planyo-cal-icon' target='_self' onclick="planyo_show_calendar('box_start_date',null);" id="box_start_datecalref">&#160;</a>
        </span>
      </span>
    </div>
  </div>
  <div class='form-group planyo-form-item-group single-col' id='row_rental_time_value'>
    <label class='control-label'>Dauer</label>
    <select class='with-status-border form-control' name='rental_time_value' id='box_rental_time_value'>
      <option selected='selected' value="168">7 Tage</option>
      <option value="336">14 Tage</option>
      <option value="240">10 Tage</option>
    </select>
  </div>
  <input type='hidden' value="name" id='sort_fields' name='sort_fields' />
  <input type='hidden' value="name" id='sort' name='sort' />
  <input type='hidden' value="1" id='is_night' name='is_night' />
  <input type='hidden' value="1440" id='granulation' name='granulation' />
  <input type='hidden' value="search" id='mode' name='mode' />
  <input type='hidden' value="DE" id='custom-language' name='custom-language' />
  <input type='hidden' value="" id='tz_offset' name='tz_offset' />
  <input type='hidden' value="1" id='lightbox' name='lightbox' />
  <div id='res_form_buttons'>
    <label for='submit_button'>&nbsp;</label>
    <input class='btn btn-primary btn-lg' id='box_submit_button' name='submit_button' type='submit' value="Suche" />
  </div>
  <input type='hidden' value='true' id='submitted_field' name='submitted' />
</form>

<iframe id='planyo_li_iframe' name='planyo_li_iframe'
  style='width:100%;min-height:600px;border:none;margin-top:2rem;display:block;'
  src='about:blank'></iframe>

<script>
(function(){
  var tz = new Date().getTimezoneOffset();
  var el = document.getElementById('tz_offset');
  if(el) el.value = tz;
  document.date_format = "d.m.Y";
  document.first_weekday = 1;
  document.new_scheme = 1;
  document.s_prev="Vorherige"; document.s_next="N\\u00e4chste"; document.s_today="Heute";
  document.s_day="Tag"; document.s_days="Tage"; document.s_week="Woche"; document.s_weeks="Wochen";
  document.s_weekday="Wochentag"; document.s_month="Monat"; document.s_single_res="Einzelne Ressource";
  document.s_weekdays_short=["M","D","M","D","F","S","S"];
  document.s_weekdays_med=["Mo","Di","Mi","Do","Fr","Sa","So"];
  document.s_weekdays_long=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];
  document.s_months_short=["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
  document.s_months_long=["Januar","Februar","M\\u00e4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
  document.s_all="Alle"; document.s_showall="Alle zeigen";
  document.s_areav="sind verf\\u00fcgbar. "; document.s_clickres="Klicken Sie hier, um eine Buchung vorzunehmen.";
  document.s_outof="von"; document.s_unav="Nicht verf\\u00fcgbar"; document.s_av="Verf\\u00fcgbar";
  document.s_vacation="Ferien"; document.s_allday="Ganzer Tag";
  document.s_day_view="Tag zeigen"; document.s_month_view="Monat zeigen"; document.s_more="mehr";
  window.verify_search_fields = "box_start_date";
  if(typeof planyo_set_event === 'function'){
    planyo_set_event(document, 'mousedown', 'planyo_close_calendar', false);
    planyo_set_event(document.getElementById('box_start_datecal'), 'click', 'planyo_dummy', false);
  }
})();
</script>
`,
            }}
          />
        </motion.div>
      </div>
    </main>
  )
}
