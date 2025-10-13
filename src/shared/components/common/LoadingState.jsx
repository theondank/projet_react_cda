import React from "react";
import { MainLayout } from "@layouts/MainLayout";
import { PageCard } from "@ui/page-card";

const LoadingState = () => {
  return (
    <MainLayout title="Recettes" subtitle="Chargement en cours..." icon="⏳">
      <PageCard>
        <div className="flex justify-center items-center p-12">
          <div className="text-center">
            <span className="text-4xl mb-4 block">⏳</span>
            <div className="text-lg text-gray-600">
              Chargement des recettes...
            </div>
          </div>
        </div>
      </PageCard>
    </MainLayout>
  );
};

export default LoadingState;
