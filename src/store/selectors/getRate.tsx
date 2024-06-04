/* eslint-disable no-plusplus */
// Generate the star rendering based on the recipe.rate
export default function getRate(recipeRate: number) {
  const rate = [];
  for (let i = 0; i < recipeRate; i++) {
    rate.push(<i className="bx bxs-star" key={i} />);
  }
  for (let i = recipeRate; i < 5; i++) {
    rate.push(<i className="bx bx-star" key={i} />);
  }
  return rate;
}
