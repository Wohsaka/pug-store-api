CREATE TABLE items ( id SERIAL PRIMARY KEY, 
productName VARCHAR(255) NOT NULL, 
productPrice NUMERIC NOT NULL, 
category VARCHAR(40) NOT NULL, 
productId TEXT NOT NULL,  
productImg TEXT NOT NULL, 
productDescription TEXT NOT NULL);

INSERT INTO items (productName, productPrice, category, productId, productImg, productDescription) VALUES ('Dog Food Premium 8kg', 
20.00, 
'Food', 
'DF01', 
'https://happydog_en_sb.cstatic.io/440x440/f/69110/480x480/c90b13149a/hd-vet-new-product-slider-packshots-sensible-11kg-300g.png',
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut nobis est officiis culpa sapiente? Illum suscipit, explicabo qui consectetur corrupti reprehenderit repellendus perspiciatis ab at dicta obcaecati facere excepturi? Dicta deserunt totam alias magnam. Optio numquam ut explicabo, provident repellat voluptatibus.'
);