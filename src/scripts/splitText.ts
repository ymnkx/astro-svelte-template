type Props = {
  element: HTMLElement;
  isDouble?: boolean; // spanを二重構造にする
};

export const splitText = (props: Props): Array<HTMLElement> => {
  const { element, isDouble = false } = props;

  const splited_text = element ? [...element.innerText] : [];
  element.innerHTML = '';
  const output: Array<HTMLElement> = [];
  for (let i = 0; i < splited_text.length; i++) {
    const innerElement = document.createElement('span');
    innerElement.style.display = 'inline-block';
    innerElement.innerText = splited_text[i];
    if (!splited_text[i].trim()) innerElement.style.width = '0.25em';
    output.push(innerElement);

    if (isDouble) {
      const outerElement = document.createElement('span');
      outerElement.style.overflow = 'hidden';
      outerElement.style.display = 'inline-block';
      outerElement.appendChild(innerElement);
      element.appendChild(outerElement);
    } else {
      element.appendChild(innerElement);
    }
  }
  return output;
};
