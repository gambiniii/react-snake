import styled, { createGlobalStyle } from "styled-components";
import * as colors from "../config/colors";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    button {
        cursor: pointer;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
        transition: all 300ms;
    }

`