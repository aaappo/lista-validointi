document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('kirjautumisformi');
  const result = document.getElementById('tulos');
  const resetBtn = document.getElementById('resetBtn');

  function showError(field, message) {
    const el = document.querySelector(`.error[data-for="${field}"]`);
    if (el) el.textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(e => e.textContent = '');
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  }

  function validateNimi(value) {
    if (!value.trim()) return 'Nimi on pakollinen.';
    return '';
  }

  function validateOsote(value) {
    if (!value.trim()) return 'Osoite on pakollinen.';
    return '';
  }

  function validateMaa(value) {
    if (!value) return 'Valitse maa.';
    return '';
  }

  function validatePostikoodi(value) {
    if (!/^[0-9]{5}$/.test(value)) return 'Postinumerossa pitää olla 5 numeroa.';
    return '';
  }

  function validateEmail(value) {
    if (!value.trim()) return 'Sähköposti on pakollinen.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!re.test(value)) return 'Sähköpostin muoto on virheellinen.';
    return '';
  }

  function validateSukupuoli() {
    const sukupuoli = form.querySelector('input[name="sukupuoli"]:checked');
    if (!sukupuoli) return 'Valitse sukupuoli.';
    return '';
  }

  function validateKieli() {
    const kieli = form.querySelectorAll('input[name="kieli"]:checked');
    if (kieli.length === 0) return 'Valitse vähintään yksi kieli.';
    return '';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    result.textContent = '';
    result.className = '';

    const nimi = form.nimi.value;
    const osote = form.osote.value;
    const maa = form.maa.value;
    const postikoodi = form.postikoodi.value;
    const email = form.email.value;

    const errors = {
      nimi: validateNimi(nimi),
      osote: validateOsote(osote),
      maa: validateMaa(maa),
      postikoodi: validatePostikoodi(postikoodi),
      email: validateEmail(email),
      sukupuoli: validateSukupuoli(),
      kieli: validateKieli()
    };

    let hasError = false;
    for (let field in errors) {
      if (errors[field]) {
        showError(field, errors[field]);
        const input = form[field];
        if (input && input.focus) input.classList.add('input-error');
        hasError = true;
      }
    }

    if (hasError) {
      result.textContent = 'Lomakkeessa on virheitä, korjaa punaiset kentät.';
      result.classList.add('error');
      return;
    }

    result.textContent = 'Lomake on kelvollinen kaikki, tarkistukset läpäisty.';
    result.classList.add('success');
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    clearErrors();
    result.textContent = '';
    result.className = '';
  });
});