import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ByNutrientSearchMain } from "./components/NutrientsSearch/ByNutrientSearchMain";
import { FoodSelector } from "./components/FoodSelection/FoodSelector";
import { Auth0Provider } from "@auth0/auth0-react";
import { MealPlanMain } from "./components/MealPlans/MealPlanMain";
import { ProtectedRoute } from "./routes/ProtectedRoute";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain={"food-app-test-edvjask.eu.auth0.com"}
        clientId={"R5fJg5063ysl9gc3FTGq0blk9u5wOWOD"}
        audience={"http://api.food-app.edvjask.dev"}
        redirectUri={window.location.origin}
      >
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              path={"plans"}
              element={
                <ProtectedRoute>
                  <MealPlanMain />
                </ProtectedRoute>
              }
            />
            <Route path={"by_nutrients"} element={<ByNutrientSearchMain />} />
            <Route path={"/"} element={<FoodSelector />} />
          </Route>
        </Routes>
      </Auth0Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
