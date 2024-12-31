import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./Navigation";
import './webStorage';

export default function App() {
    return (
        <PaperProvider>
            <Navigation />
        </PaperProvider>
    );
} 