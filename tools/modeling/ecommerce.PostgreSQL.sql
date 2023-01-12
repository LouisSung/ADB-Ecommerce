START TRANSACTION ISOLATION LEVEL SERIALIZABLE, READ WRITE;

CREATE SCHEMA entity;
CREATE SCHEMA aiding;
CREATE SCHEMA precomputed;

DO $$
BEGIN
  EXECUTE 'ALTER DATABASE '||current_database()||' SET search_path TO entity,aiding,precomputed,"$user",public;';
END $$;


CREATE DOMAIN entity.Actual_Storage_Count AS INTEGER CONSTRAINT Actual_Storage_Count_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Arrival_Zip_Code AS INTEGER CONSTRAINT Arrival_Zip_Code_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Primary_Category AS INTEGER CONSTRAINT Primary_Category_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Proc_Status AS INTEGER CONSTRAINT Proc_Status_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Product_Id AS INTEGER CONSTRAINT Product_Id_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Redelivery_Count AS INTEGER CONSTRAINT Redelivery_Count_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Rg_Id AS INTEGER CONSTRAINT Rg_Id_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Secondary_Category AS INTEGER CONSTRAINT Secondary_Category_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Shipping_Zip_Code AS INTEGER CONSTRAINT Shipping_Zip_Code_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Storage_Count AS INTEGER CONSTRAINT Storage_Count_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Supplier_Id AS INTEGER CONSTRAINT Supplier_Id_Unsigned_Chk CHECK (VALUE >= 0);

CREATE DOMAIN entity.Supplier_Zip_Code AS INTEGER CONSTRAINT Supplier_Zip_Code_Unsigned_Chk CHECK (VALUE >= 0);

CREATE TABLE entity.cancel
(
	rg_id entity.Rg_Id NOT NULL,
	cancel_time TIMESTAMP NOT NULL,
	proc_status entity.Proc_Status NOT NULL,
	cancel_reason CHARACTER VARYING(15) NOT NULL,
	constraint Cancel_PK PRIMARY KEY(rg_Id)
);

CREATE TABLE entity."order"
(
	customer_id CHARACTER VARYING(53) NOT NULL,
	rg_id entity.Rg_Id NOT NULL,
	product_length DOUBLE PRECISION,
	product_width DOUBLE PRECISION,
	product_height DOUBLE PRECISION,
	product_weight DOUBLE PRECISION,
	package_id CHARACTER VARYING(11),
	rm_id CHARACTER(15) NOT NULL,
	rs_id CHARACTER(15) NOT NULL,
	shipping_name CHARACTER VARYING(25),
	order_time TIMESTAMP NOT NULL,
	product_id DOUBLE PRECISION NOT NULL, -- FIXME: entity.Product_Id NOT NULL,
	guaranteed_shipping_time TIMESTAMP NOT NULL,
	actual_shipping_time TIMESTAMP,
	arrival_zip_code DOUBLE PRECISION NOT NULL, -- FIXME: entity.Arrival_Zip_Code NOT NULL,
	arrival_address CHARACTER VARYING(149) NOT NULL,
	shipping_company CHARACTER VARYING(14),
	warehouse CHARACTER VARYING(5),
	shipping_method CHARACTER VARYING(3),
	redelivery_count DOUBLE PRECISION, -- FIXME: entity.Redelivery_Count,
	source_file CHARACTER VARYING(17) NOT NULL,
	CONSTRAINT Order_PK PRIMARY KEY(rs_Id)
);

CREATE TABLE entity.product
(
	supplier_id entity.Supplier_Id NOT NULL,
	product_id entity.Product_Id NOT NULL,
	primary_category entity.Primary_Category,
	secondary_category entity.Secondary_Category,
	supplier_model CHARACTER VARYING(50),
	product_name CHARACTER VARYING(50),
	barcode CHARACTER(13),
	product_length DOUBLE PRECISION NOT NULL,
	product_width DOUBLE PRECISION NOT NULL,
	product_height DOUBLE PRECISION NOT NULL,
	product_weight DOUBLE PRECISION NOT NULL,
	warehouse CHARACTER VARYING(5),
	product_keyin_time TIMESTAMP,
	source_file CHARACTER VARYING(17) NOT NULL,
	CONSTRAINT Product_PK PRIMARY KEY(product_Id)
);

CREATE TABLE entity."return"
(
	rg_id entity.Rg_Id NOT NULL,
	rm_id CHARACTER(15) NOT NULL,
	rs_id CHARACTER(15),
	return_id CHARACTER VARYING(13) NOT NULL,
	return_establish_time TIMESTAMP NOT NULL,
	return_complete_time TIMESTAMP,
	return_reason CHARACTER VARYING(15) NOT NULL,
	CONSTRAINT Return_PK PRIMARY KEY(return_Id)
);

CREATE TABLE entity.shipment
(
	rg_id entity.Rg_Id NOT NULL,
	rm_id CHARACTER(15) NOT NULL,
	shipping_id CHARACTER VARYING(13),
	return_complete_time TIMESTAMP,
	failure_code CHARACTER VARYING(3),
	failure_reason CHARACTER VARYING(15),
	return_reason CHARACTER VARYING(15),
	convenience_store CHARACTER VARYING(12),
	source_file CHARACTER VARYING(17) NOT NULL,
	CONSTRAINT Shipment_PK PRIMARY KEY(rm_Id)
);

CREATE TABLE entity.storage
(
	sl_id CHARACTER VARYING(15) NOT NULL,
	supplier_id entity.Supplier_Id NOT NULL,
	product_id entity.Product_Id NOT NULL,
	storage_count entity.Storage_Count NOT NULL,
	actual_storage_count entity.Actual_Storage_Count NOT NULL,
	specified_arrival_time TIMESTAMP NOT NULL,
	actual_arrival_time TIMESTAMP NOT NULL,
	warehouse CHARACTER VARYING(5) NOT NULL,
	CONSTRAINT Storage_PK PRIMARY KEY(sl_Id)
);

CREATE TABLE entity.supplier
(
	supplier_id entity.Supplier_Id NOT NULL,
	supplier_name CHARACTER VARYING(32) NOT NULL,
	shipping_zip_code entity.Shipping_Zip_Code NOT NULL,
	shipping_address CHARACTER VARYING(54) NOT NULL,
	supplier_zip_code entity.Supplier_Zip_Code NOT NULL,
	supplier_address CHARACTER VARYING(54) NOT NULL,
	CONSTRAINT Supplier_PK PRIMARY KEY(supplier_Id)
);


-- CREATE INDEX ON entity.cancel (rg_id);
CREATE INDEX ON entity.cancel (cancel_time);
CREATE INDEX ON entity.cancel (proc_status);
CREATE INDEX ON entity.cancel (cancel_reason);

CREATE INDEX ON entity."order" (rg_id);
CREATE INDEX ON entity."order" (product_length);
CREATE INDEX ON entity."order" (product_width);
CREATE INDEX ON entity."order" (product_height);
CREATE INDEX ON entity."order" (product_weight);
CREATE INDEX ON entity."order" (package_id);
CREATE INDEX ON entity."order" (rm_id);
-- CREATE INDEX ON entity."order" (rs_id);
CREATE INDEX ON entity."order" (shipping_name);
CREATE INDEX ON entity."order" (order_time);
CREATE INDEX ON entity."order" (product_id);
CREATE INDEX ON entity."order" (guaranteed_shipping_time);
CREATE INDEX ON entity."order" (actual_shipping_time);
CREATE INDEX ON entity."order" (arrival_zip_code);
CREATE INDEX ON entity."order" (arrival_address);
CREATE INDEX ON entity."order" (shipping_company);
CREATE INDEX ON entity."order" (warehouse);
CREATE INDEX ON entity."order" (shipping_method);
CREATE INDEX ON entity."order" (redelivery_count);
CREATE INDEX ON entity."order" (source_file);

CREATE INDEX ON entity.product (supplier_id);
-- CREATE INDEX ON entity.product (product_id);
CREATE INDEX ON entity.product (primary_category);
CREATE INDEX ON entity.product (secondary_category);
CREATE INDEX ON entity.product (supplier_model);
CREATE INDEX ON entity.product (product_name);
CREATE INDEX ON entity.product (barcode);
CREATE INDEX ON entity.product (product_length);
CREATE INDEX ON entity.product (product_width);
CREATE INDEX ON entity.product (product_height);
CREATE INDEX ON entity.product (product_weight);
CREATE INDEX ON entity.product (warehouse);
CREATE INDEX ON entity.product (product_keyin_time);
CREATE INDEX ON entity.product (source_file);

CREATE INDEX ON entity."return" (rg_id);
CREATE INDEX ON entity."return" (rm_id);
CREATE INDEX ON entity."return" (rs_id);
-- CREATE INDEX ON entity."return" (return_id);
CREATE INDEX ON entity."return" (return_establish_time);
CREATE INDEX ON entity."return" (return_complete_time);
CREATE INDEX ON entity."return" (return_reason);

CREATE INDEX ON entity.shipment (rg_id);
-- CREATE INDEX ON entity.shipment (rm_id);
CREATE INDEX ON entity.shipment (shipping_id);
CREATE INDEX ON entity.shipment (return_complete_time);
CREATE INDEX ON entity.shipment (failure_code);
CREATE INDEX ON entity.shipment (failure_reason);
CREATE INDEX ON entity.shipment (return_reason);
CREATE INDEX ON entity.shipment (convenience_store);
CREATE INDEX ON entity.shipment (source_file);

-- CREATE INDEX ON entity.storage (sl_id);
CREATE INDEX ON entity.storage (supplier_id);
CREATE INDEX ON entity.storage (product_id);
CREATE INDEX ON entity.storage (storage_count);
CREATE INDEX ON entity.storage (actual_storage_count);
CREATE INDEX ON entity.storage (specified_arrival_time);
CREATE INDEX ON entity.storage (actual_arrival_time);
CREATE INDEX ON entity.storage (warehouse);

-- CREATE INDEX ON entity.supplier (supplier_id);
CREATE INDEX ON entity.supplier (supplier_name);
CREATE INDEX ON entity.supplier (shipping_zip_code);
CREATE INDEX ON entity.supplier (shipping_address);
CREATE INDEX ON entity.supplier (supplier_zip_code);
CREATE INDEX ON entity.supplier (supplier_address);


COMMIT WORK;
