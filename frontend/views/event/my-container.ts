import { LitElement, html, customElement, css } from "lit-element";
import "./my-button";
import { MyButtonEvent } from "./my-button";

@customElement("my-container")
class MyContainer extends LitElement {
    static styles = css`
    :host {
      display: block;
    }
  `;

    constructor() {
        super();
    }

    render() {
        return html`
      <my-button @myClick=${this.handleClick} label="Hello LitElement">
      </my-button>
    `;
    }

    // private handleClick(e: Event) {
    //   console.log("MyContainer, myClick", e);
    // }

    private handleClick(e: CustomEvent<MyButtonEvent>) {
        const detail: MyButtonEvent = e.detail;

        console.log("MyContainer, myClick", detail);
    }
}
