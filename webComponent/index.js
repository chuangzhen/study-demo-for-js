class CustomButton extends HTMLElement {
    constructor() {
        // 必须首先调用 super方法 
        super()

        // 元素的功能代码写在这里
        const templateContent = document.getElementById('custom-button').content
        const shadowRoot = this.attachShadow({ mode: 'open' })

        shadowRoot.appendChild(templateContent.cloneNode(true))

        shadowRoot.querySelector('button').onclick = () => {
            alert('Hello World!')
        }
    }

    connectedCallback() {
        console.log('connected')
    }
}

customElements.define('custom-button', CustomButton)