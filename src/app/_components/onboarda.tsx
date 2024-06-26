"use client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useOnborda } from "onborda";
import React from "react";

export const OnboardaButton = () => {
  const { startOnborda } = useOnborda();
  const handleStartOnborda = () => {
    startOnborda();
  };

  return (
    <div>
      <Button size="lg" onClick={handleStartOnborda}>
        <Sparkles size={16} className="mr-2" /> Start the tour
      </Button>
    </div>
  );
};
