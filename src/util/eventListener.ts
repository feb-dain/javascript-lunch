import { $ } from "./selector";

export const executeClickEventListener = (
  selector: HTMLElement | Element | null,
  callback: (event: Event) => void
) => {
  selector?.addEventListener("click", (event) => callback(event));
};

export const executeSubmitEventListener = (
  selector: string,
  callback: (event: Event) => void
) => {
  $(selector)?.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    callback(event);
  });
};

export const executeChangeEventListener = (
  selector: string,
  callback: (value: string | number) => void
) => {
  $(selector)?.addEventListener("change", (event: Event) => {
    const element = event.target as HTMLOptionElement;

    callback(element.value);
  });
};
