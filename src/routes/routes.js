import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/home";
import Score from "../pages/Score/score";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Home />}
                />
                <Route
                    exact
                    path="/score"
                    element={<Score />}
                />
            </Routes>
        </BrowserRouter>
    )
}