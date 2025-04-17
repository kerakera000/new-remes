// addjustComp.tsx
import React from "react";

interface AddjustCompProps {
    height?: string;
}

const HotcategoryComp: React.FC<AddjustCompProps> = ({ height }) => {
    return (
        <div style={{ width: "100%", height: height }}>
        </div>
    );
};

export default HotcategoryComp;