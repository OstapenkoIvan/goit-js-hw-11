export default class LoadMoreBtn {
  constructor(refClass) {
    this.loadBtn = document.querySelector(refClass);
  }
  hide() {
    this.loadBtn.classList.add('is-hidden');
  }
  show() {
    this.loadBtn.classList.remove('is-hidden');
  }
  disabled() {
    this.loadBtn.disabled = true;
  }
  enabled() {
    this.loadBtn.disabled = false;
  }
}
