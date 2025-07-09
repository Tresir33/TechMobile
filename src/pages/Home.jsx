import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import '../styles/index.css';
import wallpaper from '../assets/images/Wallpaper 4k.png';
import samsungS24Plus from '../assets/images/Samsung S24 plus.webp';
import usbCCharger from '../assets/images/USB-C charger.webp';
import jblHeadset from '../assets/images/JBL-headset.webp';

// Styled-components for the homepage
const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 50vh; // Adjust height as needed for the hero image
  background-image: url(${wallpaper});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const WelcomeText = styled.h1`
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translateX(-50%); // Center horizontally
  font-size: 2.625rem; // 42px converted to rem (42/16)
  color: var(--texts); // White text from index.css
  font-family: "Archivo Narrow";
  margin: 0;
  &:hover {
    color: var(--text-1); // Hover effect using text-1 color from index.css
  }
`;

const SliderSection = styled.div`
  width: 100%;
  overflow-x: hidden; // Hide scrollbar for seamless looping
  scroll-snap-type: x mandatory;
  display: flex;
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
  background-color: var(--Bg-1); // Background for contrast
  &::-webkit-scrollbar {
    display: none; // Hide scrollbar for cleaner look
  }
`;

const SliderItem = styled.div`
  flex: 0 0 auto;
  width: 35rem; // Fixed width for each parallelogram
  height: 20rem; // Fixed height for each parallelogram
  background-color: var(--item-bg); // #18528B from index.css
  transform: skewX(-30deg); // Creates 60° parallelogram
  margin: 1rem; // Equal spacing between items
  scroll-snap-align: center;
  cursor: pointer; // Indicate clickability
  position: relative; // For positioning the reflection

  &:hover::after {
    content: '';
    position: absolute;
    top: 100%; // Place directly below the parallelogram
    left: 0;
    width: 100%;
    height: 5rem; // 1/4 of 20rem height
    background: linear-gradient(
      to bottom,
      rgba(12, 70, 127, 0.9), // #0C467F with 90% opacity for visibility
      transparent
    ); // Fade to transparent
    transform: skewX(-30deg) scaleY(-1); // Mirror the parallelogram shape
    transform-origin: top;
  }
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 0;
  background-color: var(--Bg-1);
`;

const ControlButton = styled.button`
  background-color: var(--box);
  color: var(--texts);
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: var(--text-1);
  }
`;

const ProductsSection = styled.div`
  width: 100%;
  padding: 3.5rem 0; // Horizontal padding for content
  background-color: var(--Bg-1); // Match slider background
  display: flex;
  flex-direction: column;
  gap: 2vw; // 2% viewport width spacing
`;

const ProductsTitle = styled.h2`
  font-size: 2.625rem; // Slightly smaller than WelcomeText for hierarchy
  font-weight: 700;
  font-family: "Archivo Narrow";
  color: #F2E782; // Specified title color
  text-align: left;
  margin: 0;
  padding: 1vw 0 2vw 2vw; // 2% spacing below title
`;

const ProductsContent = styled.div`
  display: flex;
  flex-wrap: wrap; // Allow stacking on smaller screens
  gap: 5rem; // Space between left and right halves
  width: 100%;
`;

const ProductImageLarge = styled.img`
  width: 35%; // Half the screen width
  max-width: 40vw; // Ensure responsiveness
  height: 60%; // Maintain aspect ratio
  object-fit: contain; // Prevent distortion
  flex: 0 0 50%; // Fixed width for layout
  border-radius: 10%;
  margin-left: 6%;
`;

const ProductInfo = styled.div`
  flex: 0 0 45%; // Slightly less than 50% to account for gap
  display: grid;
  grid-template-columns: 1fr 1fr; // 2 equal columns
  grid-template-rows: 1fr 1fr; // 2 equal rows
  gap: 1rem; // Space between grid items
  height: fit-content; // Adjust to content height
`;

const ProductText = styled.p`
  font-size: 1.5rem;
  font-family: "Tenor Sans";
  color: #928F88; // Specified text color
  margin: 0 0 0 1%;
  line-height: 1.5;
  grid-column: 1; // Top-left
  grid-row: 1;
  align-self: center;
`;

const ProductImageSmall = styled.img`
  width: 100%; // Fill grid cell
  max-width: 90%; // Prevent overflow
  height: auto; // Maintain aspect ratio
  object-fit: contain; // Prevent distortion
  border-radius: 10%;
`;

const Home = () => {
  const sliderRef = useRef(null);

  // 6 items for the slider, duplicated for looping
  const items = Array(6).fill(null); // 6 items as specified
  const duplicatedItems = [...items, ...items, ...items]; // Triple for looping

  // Scroll handlers
  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Handle seamless looping
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider;
      const itemWidth = 35 * 16 + 2 * 16; // 35rem width + 2 * 1rem margin in pixels
      const totalItems = items.length;
      const loopPoint = totalItems * itemWidth; // Point to reset scroll

      if (scrollLeft >= loopPoint * 2) {
        slider.scrollTo({ left: loopPoint, behavior: 'instant' });
      } else if (scrollLeft <= 0) {
        slider.scrollTo({ left: loopPoint, behavior: 'instant' });
      }
    };

    slider.addEventListener('scroll', handleScroll);
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [items.length]);

  // Handle mouse wheel scrolling
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const scrollAmount = e.deltaY * 2; // Amplify wheel movement
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    slider.addEventListener('wheel', handleWheel, { passive: false });
    return () => slider.removeEventListener('wheel', handleWheel);
  }, []);

  // Handle keyboard shortcuts (ArrowLeft and ArrowRight)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        scrollLeft();
      } else if (e.key === 'ArrowRight') {
        scrollRight();
      }
    };

    slider.addEventListener('keydown', handleKeyDown);
    return () => slider.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reusable button component
  const SliderButton = ({ direction, onClick, ariaLabel }) => (
    <ControlButton onClick={onClick} aria-label={ariaLabel}>
      {direction}
    </ControlButton>
  );

  return (
    <>
      <HeroSection>
        <WelcomeText>Welcome to our website</WelcomeText>
      </HeroSection>
      <SliderSection ref={sliderRef} tabIndex="0">
        {duplicatedItems.map((_, index) => (
          <SliderItem key={index} />
        ))}
      </SliderSection>
      <SliderControls>
        <SliderButton
          direction="←"
          onClick={scrollLeft}
          ariaLabel="Scroll slider left"
        />
        <SliderButton
          direction="→"
          onClick={scrollRight}
          ariaLabel="Scroll slider right"
        />
      </SliderControls>
      <ProductsSection>
        <ProductsTitle>OUR PRODUCTS</ProductsTitle>
        <ProductsContent>
          <ProductImageLarge src={samsungS24Plus} alt="Samsung Galaxy S24 Plus" />
          <ProductInfo>
            <ProductText>
              To view more items & details tap on designated image
            </ProductText>
            <ProductImageSmall
              src={usbCCharger}
              alt="USB-C Charger"
              style={{ gridColumn: 2, gridRow: 1 }} // Top-right
            />
            <ProductImageSmall
              src={jblHeadset}
              alt="JBL Headset"
              style={{ gridColumn: 1, gridRow: 2 }} // Bottom-left
            />
          </ProductInfo>
        </ProductsContent>
      </ProductsSection>
    </>
  );
};

export default Home;