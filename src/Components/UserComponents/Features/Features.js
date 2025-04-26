import React from 'react';
import './Features.css';
import { assets } from '../../../Assets/Images/assets'; // Adjust path as needed

function Features() {
  // Organize features into categories
  const categories = {
    qualityAndAuthenticity: [
      {
        image: assets.quality, // Replace with actual asset
        title: '100% Authentic Delhi Food',
        description: 'Home Food of Delhi by the People from Delhi',
      },
      {
        image: assets.chef, // Replace with actual asset
        title: 'Crafted By Home Chef',
        description: 'Known for Cooking & Hosting Skills Back Home. Mild to Medium Spice Level',
      },
    ],
    cookingAndVariety: [
      {
        image: assets.cooking, // Replace with actual asset
        title: 'HomeStyle Cooking',
        description: 'Ghar Ka Khana, Ghar Ka Swaad',
      },
      {
        image: assets.variety, // Replace with actual asset
        title: 'Variety',
        description: 'New Menu Every Week',
      },
    ],
    valueAndConvenience: [
      {
        image: assets.value, // Replace with actual asset
        title: 'Value for Money',
        description: 'Cheaper than Eating Outside',
      },
      {
        image: assets.convenience, // Replace with actual asset
        title: 'Convenience',
        description: '3 minutes to heat. Eco friendly chilled & secured packaging. Easy reheating. No prepping or cleaning',
      },
    ],
    healthAndSustainability: [
      {
        image: assets.persevative, // Replace with actual asset
        title: 'No Bottles, Jars or Preservatives',
        description: 'Hand blended spices & marindates',
      },
      {
        image: assets.freezer, // Replace with actual asset
        title: 'Freezer Friendly Meals',
        description: 'Freeze the Flavor, Unleash the Taste',
      }
    ],
  };

  // Flatten features into a single array for easier rendering
  const allFeatures = Object.values(categories).flat();

  // Add placeholder features to fill the 4x4 grid
  const placeholderFeatures = Array(16 - allFeatures.length).fill({
    image: '', // No image for placeholder
    title: '',
    description: '',
  });

  const featuresWithPlaceholders = [...allFeatures, ...placeholderFeatures];

  return (
    <div className="features-section">
      {featuresWithPlaceholders.map((feature, index) => (
        <div className="feature-item" key={index}>
          {feature.image && (
            <img src={feature.image} alt={feature.title} className="feature-icon" />
          )}
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Features;
