'use strict';
const records = window.NV_ATLAS;
const input = document.querySelector('#search');
const entries = document.querySelector('#entries');
const count = document.querySelector('#count');
const normalize = value => value.normalize('NFKC').toLocaleLowerCase();
const searchable = records.map(record => normalize(Object.values(record).join('\n')));
function element(tag, className, value) {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = value;
  return node;
}
function render() {
  const query = normalize(input.value.trim());
  const matches = records.filter((_, index) => searchable[index].includes(query));
  count.textContent = `${matches.length} of ${records.length} entries${query ? ' match your search' : ''}`;
  document.querySelector('#empty').hidden = matches.length !== 0;
  const fragment = document.createDocumentFragment();
  for (const record of matches) {
    const card = element('article', 'entry', '');
    card.append(element('h3', 'entry-id', `ENTRY ${record.id}`));
    const annotation = element('div', 'annotation', '');
    const nominal = element('div', '', '');
    nominal.append(element('span', 'field-label', 'English nominal'), element('p', 'term', record.English_Nominal));
    const verb = element('div', '', '');
    const term = element('p', 'term', record.Chinese_Verb);
    term.lang = 'zh';
    verb.append(element('span', 'field-label', 'Chinese verb'), term);
    annotation.append(nominal, element('span', 'arrow', '→'), verb);
    const texts = element('div', 'texts', '');
    const english = element('div', '', '');
    english.append(element('span', 'field-label', 'English'), element('p', '', record.English));
    const chinese = element('div', '', '');
    const translation = element('p', '', record.Chinese);
    translation.lang = 'zh';
    chinese.append(element('span', 'field-label', 'Chinese'), translation);
    texts.append(english, chinese);
    card.append(annotation, texts);
    fragment.append(card);
  }
  entries.replaceChildren(fragment);
}
function reset() { input.value = ''; render(); input.focus(); }
input.addEventListener('input', render);
document.querySelector('#clear').addEventListener('click', reset);
document.querySelector('#reset').addEventListener('click', reset);
render();
