import React from "react";
import { MainLayout } from "@layouts/MainLayout";
import { PageCard, SectionCard } from "@ui/page-card";
import { Button } from "@ui/button";

const ErrorState = ({ error, onRetry }) => {
  return (
    <MainLayout title="Erreur" subtitle="Problème de chargement" icon="⚠️">
      <PageCard>
        <SectionCard gradient="from-red-50 to-pink-50">
          <div className="text-center">
            <span className="text-4xl mb-4 block">😞</span>
            <h3 className="font-medium text-red-800 mb-2">Erreur</h3>
            <p className="mt-1 text-sm text-red-600 mb-4">{error}</p>
            <Button
              onClick={onRetry}
              className="bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white border-0 rounded-full px-6 py-2 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <span className="mr-2">🔄</span>
              Réessayer
            </Button>
          </div>
        </SectionCard>
      </PageCard>
    </MainLayout>
  );
};

export default ErrorState;
