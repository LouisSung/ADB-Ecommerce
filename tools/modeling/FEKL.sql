#!factengine
-- !!! modeling with FEKL (FactEngine Knowledge Language) !!!
--=== Entity Types ===
Order IS AN ENTITY TYPE
Return IS AN ENTITY TYPE
Cancel IS AN ENTITY TYPE
Shipment IS AN ENTITY TYPE
Supplier IS AN ENTITY TYPE
Product IS AN ENTITY TYPE
Storage IS AN ENTITY TYPE

Order IS IDENTIFIED BY ITS Rs_Id WRITTEN AS StringFixedLength(15)
Return IS IDENTIFIED BY ITS Return_Id WRITTEN AS StringVariableLength(13)	--<<
Cancel IS IDENTIFIED BY ITS Rg_Id WRITTEN AS UnsignedInteger
Shipment IS IDENTIFIED BY ITS Rm_Id WRITTEN AS StringFixedLength(15)
Supplier IS IDENTIFIED BY ITS Supplier_Id WRITTEN AS UnsignedInteger	--<<
Product IS IDENTIFIED BY ITS Product_Id WRITTEN AS UnsignedInteger	--<<
Storage IS IDENTIFIED BY ITS Sl_Id WRITTEN AS StringVariableLength(15)

-- STOP!! MANUALLY RENAME THE GENERATED VALUE FOR REFERENCE (FOR Order, Cancel, Shipment, and Storage)



-- (Customer_Id|Product_Length|Product_Width |Product_Height|Product_Weight|Package_Id|Shipping_Name|Order_Time|Guaranteed_Shipping_Time|Actual_Shipping_Time|Arrival_Zip_Code|Arrival_Address |Shipping_Company|Warehouse|Shipping_Method |Redelivery_Count|Source_File|Return_Establish_Time|Return_Complete_Time|Return_Reason|Cancel_Time|Proc_Status|Cancel_Reason|Shipping_Id|Failure_Code|Failure_Reason|Convenience_Store|Supplier_Name|Shipping_Zip_Code|Shipping_Address|Supplier_Zip_Code|Supplier_Address|Product_Name|Product_Keyin_Time|Primary_Category|Secondary_Category|Supplier_Model|barcode|Storage_Count|Actual_Storage_Count|Specified_Arrival_Time|Actual_Arrival_Time|Rs_Id|Return_Id|Rg_Id|Rm_Id|Supplier_Id|Product_Id|Sl_Id)1?
--=== Value Types ===
--= Order ===
--- order_2011Q3.csv, 20110630.csv, etc. ---
Customer_Id IS A VALUE TYPE WRITTEN AS StringVariableLength(53)
-->>> Rg_Id IS A VALUE TYPE WRITTEN AS UnsignedInteger
Product_Length IS A VALUE TYPE WRITTEN AS FloatDoublePrecision
Product_Width IS A VALUE TYPE WRITTEN AS FloatDoublePrecision
Product_Height IS A VALUE TYPE WRITTEN AS FloatDoublePrecision
Product_Weight IS A VALUE TYPE WRITTEN AS FloatDoublePrecision
Package_Id IS A VALUE TYPE WRITTEN AS StringVariableLength(11)
-->>> Rm_Id IS A VALUE TYPE WRITTEN AS StringFixedLength(15)
-->>> Rs_Id IS A VALUE TYPE WRITTEN AS StringFixedLength(15)
Shipping_Name IS A VALUE TYPE WRITTEN AS StringVariableLength(25)
Order_Time IS A VALUE TYPE WRITTEN AS TemporalDateTime
-->> Product_Id IS A VALUE TYPE WRITTEN AS UnsignedInteger
Guaranteed_Shipping_Time IS A VALUE TYPE WRITTEN AS TemporalDateTime
Actual_Shipping_Time IS A VALUE TYPE WRITTEN AS TemporalDateTime
Arrival_Zip_Code IS A VALUE TYPE WRITTEN AS UnsignedInteger
Arrival_Address IS A VALUE TYPE WRITTEN AS StringVariableLength(149)
Shipping_Company IS A VALUE TYPE WRITTEN AS StringVariableLength(14)
Warehouse IS A VALUE TYPE WRITTEN AS StringVariableLength(5)
Shipping_Method IS A VALUE TYPE WRITTEN AS StringVariableLength(3)
Redelivery_Count IS A VALUE TYPE WRITTEN AS UnsignedInteger
Source_File IS A VALUE TYPE WRITTEN AS StringVariableLength(17)



--= Return ===
--- retgood_20120823.csv ---
--	&&#@	01. RG??????: `rg_id`	UnsignedInteger(8)
--	&&#@	02. RM??????: `rm_id`	StringFixedLength(15)
--	^^#@	03. RS??????: `rs_id`	StringFixedLength(15)
-->> Return_Id IS A VALUE TYPE WRITTEN AS StringVariableLength(13)
Return_Establish_Time IS A VALUE TYPE WRITTEN AS TemporalDateTime
Return_Complete_Time IS A VALUE TYPE WRITTEN AS TemporalDateTime
Return_Reason IS A VALUE TYPE WRITTEN AS StringVariableLength(15)



--= Cancel ===
--- cancel_order.csv --- (`rg_id` is deduplicated)
--	!!#@	01. RG??????: `rg_id`	UnsignedInteger(8)
Cancel_Time IS A VALUE TYPE WRITTEN AS TemporalDateTime
Proc_Status IS A VALUE TYPE WRITTEN AS UnsignedInteger
Cancel_Reason IS A VALUE TYPE WRITTEN AS StringVariableLength(15)



--= Shipment ===
--- ???????????????_?????????.csv --- (`rm_id` is deduplicated based on `failure_code`)
--	&&#@	01. RG??????: `rg_id`	UnsignedInteger(8)
--	!!#@	02. RM??????: `rm_id`	StringFixedLength(15)
Shipping_Id IS A VALUE TYPE WRITTEN AS StringVariableLength(13)
--	>>#@	04. ??????????????????: `return_complete_time`	TemporalDateTime(16)
Failure_Code IS A VALUE TYPE WRITTEN AS StringVariableLength(3)
Failure_Reason IS A VALUE TYPE WRITTEN AS StringVariableLength(15)
Convenience_Store IS A VALUE TYPE WRITTEN AS StringVariableLength(12)


--= Shipment ===
--- ??????_??????.csv ---
--	&&#@	01. RG??????: `rg_id`	UnsignedInteger(8)
--	!!#@	02. RM??????: `rm_id`	StringFixedLength(15)
--	^^#@	03. ????????????: `shipping_id`	UnsignedInteger(8)	#| exception: some (CVS) start with 0000 and become 11 digits; some (????????????(4)) are empty
--	>>#@	04. ??????????????????: `return_complete_time`	TemporalDateTime(16)
--	**#@	05. ????????????: `return_reason`	StringVariableLength(10)
--	**#@	06. ????????????: `convenience_store`	StringVariableLength(5)	#| diff: not same as ???????????????_?????????.csv



--= Supplier ===
--- supplier.csv --- (`supplier_id` is deduplicated)
-->> Supplier_Id IS A VALUE TYPE WRITTEN AS UnsignedInteger
Supplier_Name IS A VALUE TYPE WRITTEN AS StringVariableLength(32)
Shipping_Zip_Code IS A VALUE TYPE WRITTEN AS UnsignedInteger
Shipping_Address IS A VALUE TYPE WRITTEN AS StringVariableLength(54)
Supplier_Zip_Code IS A VALUE TYPE WRITTEN AS UnsignedInteger
Supplier_Address IS A VALUE TYPE WRITTEN AS StringVariableLength(54)



--= Product ===
--- 2012_product_list.csv ---
--	!!#@	01. ????????????: `product_id`	UnsignedInteger(7)
Product_Name IS A VALUE TYPE WRITTEN AS StringVariableLength(50)
--	**#@	03. ???????????????: `supplier_id`	UnsignedInteger(5)
--	::#@	04. ????????????(???)cm: `product_length`	FloatDoublePrecision(3)
--	::#@	05. ????????????(???)cm: `product_width`	FloatDoublePrecision(3)
--	::#@	06. ????????????(???)cm: `product_height`	FloatDoublePrecision(3)
--	::#@	07. ????????????(??????)g: `product_weight`	UnsignedInteger(6)
--	**#@	08. ??????: `warehouse`	StringVariableLength(2)
Product_Keyin_Time IS A VALUE TYPE WRITTEN AS TemporalDateTime

--= Product ===
--- sku_20120413.csv ---
--	**#@	01. ???????????????: `supplier_id`	UnsignedInteger(5)
Primary_Category IS A VALUE TYPE WRITTEN AS UnsignedInteger
Secondary_Category IS A VALUE TYPE WRITTEN AS UnsignedInteger
--	!!#@	04. ????????????: `product_id`	UnsignedInteger(7)
--	**#@	05. ????????????: `product_name`	StringVariableLength(50)
--	::#@	06. ??????(???): `product_length`	FloatDoublePrecision(4)
--	::#@	07. ??????(???): `product_width`	FloatDoublePrecision(4)
--	::#@	08. ??????(???): `product_height`	FloatDoublePrecision(4)
--	::#@	09. ??????(??????): `product_weight`	UnsignedInteger(6)

--= Product ===
--- sku_20120604.csv ---
--	**#@	01. ???????????????: `supplier_id`	UnsignedInteger(5)
--	!!#@	02. ????????????: `product_id`	UnsignedInteger(7)
Supplier_Model IS A VALUE TYPE WRITTEN AS StringVariableLength(50)
Barcode IS A VALUE TYPE WRITTEN AS StringFixedLength(13)
--	::#@	05. ????????????(???): `product_length`	FloatDoublePrecision(3)
--	::#@	06. ????????????(???): `product_width`	FloatDoublePrecision(3)
--	::#@	07. ????????????(???): `product_height`	FloatDoublePrecision(4)
--	::#@	08. ????????????: `product_weight`	UnsignedInteger(6)
--	**#@	09. ??????: `warehouse`	StringVariableLength(2)

--= Product ===
--- product(??????).csv ---
--	**#@	01. ???????????????: `supplier_id`	UnsignedInteger(5)
--	!!#@	02. ????????????: `product_id`	UnsignedInteger(7)
--	**#@	03. ??????: `primary_category`	UnsignedInteger(5)
--	**#@	04. ??????: `secondary_category`	UnsignedInteger(5)
--	&&#@	05. ???????????????(??????): `supplier_model`	StringVariableLength(50)
--	**#@	06. ????????????: `product_name`	StringVariableLength(50)
--	^^#@	07. ????????????: `barcode`	StringFixedLength(13)
--	::#@	08. ????????????(???): `product_length`	FloatDoublePrecision(4)
--	::#@	09. ????????????(???): `product_width`	FloatDoublePrecision(5)
--	::#@	10. ????????????(???): `product_height`	FloatDoublePrecision(5)
--	::#@	11. ????????????: `product_weight`	UnsignedInteger(6)
--	**#@	12. ??????: `warehouse`	StringVariableLength(2)



--= Storage ===
--- stlend.csv ---
-->>> Sl_Id IS A VALUE TYPE WRITTEN AS StringVariableLength(15)
--	**#@	02. ???????????????: `supplier_id`	UnsignedInteger(5)
--	**#@	03. ????????????: `product_id`	UnsignedInteger(7)
Storage_Count IS A VALUE TYPE WRITTEN AS UnsignedInteger
Actual_Storage_Count IS A VALUE TYPE WRITTEN AS UnsignedInteger
Specified_Arrival_Time IS A VALUE TYPE WRITTEN AS TemporalDateTime
Actual_Arrival_Time IS A VALUE TYPE WRITTEN AS TemporalDateTime
--	**#@	08. ??????: `warehouse`	StringVariableLength(2)



--=== Relationships ===
--- For Order
Order has ONE Customer_Id
Order has ONE Rg_Id
Order has AT MOST ONE Product_Length
Order has AT MOST ONE Product_Width
Order has AT MOST ONE Product_Height
Order has AT MOST ONE Product_Weight
Order has AT MOST ONE Package_Id
Order has ONE Rm_Id
---- Order IS IDENTIFIED BY ITS Rs_Id WRITTEN AS StringFixedLength(15)
Order has AT MOST ONE Shipping_Name
Order has ONE Order_Time
Order has ONE Product_Id
Order has ONE Guaranteed_Shipping_Time
Order has AT MOST ONE Actual_Shipping_Time
Order has ONE Arrival_Zip_Code
Order has ONE Arrival_Address
Order has AT MOST ONE Shipping_Company
Order has AT MOST ONE Warehouse
Order has AT MOST ONE Shipping_Method
Order has AT MOST ONE Redelivery_Count
Order has ONE Source_File



--- For Return
Return has ONE Rg_Id
Return has ONE Rm_Id
Return has AT MOST ONE Rs_Id
---- Return IS IDENTIFIED BY ITS Return_Id WRITTEN AS StringVariableLength(13)
Return has ONE Return_Establish_Time
Return has AT MOST ONE Return_Complete_Time
Return has ONE Return_Reason



--- For Cancel
---- Cancel IS IDENTIFIED BY ITS Rg_Id WRITTEN AS UnsignedInteger
Cancel has ONE Cancel_Time
Cancel has ONE Proc_Status
Cancel has ONE Cancel_Reason



--- For Shipment
Shipment has ONE Rg_Id
---- ShipmentS2S IS IDENTIFIED BY ITS Rm_Id WRITTEN AS StringFixedLength(15)
Shipment has AT MOST ONE Shipping_Id
Shipment has AT MOST ONE Return_Complete_Time
Shipment has AT MOST ONE Failure_Code
Shipment has AT MOST ONE Failure_Reason
Shipment has AT MOST ONE Return_Reason
Shipment has AT MOST ONE Convenience_Store
Shipment has ONE Source_File



--- For Supplier
---- Supplier IS IDENTIFIED BY ITS Supplier_Id WRITTEN AS UnsignedInteger
Supplier has ONE Supplier_Name
Supplier has ONE Shipping_Zip_Code
Supplier has ONE Shipping_Address
Supplier has ONE Supplier_Zip_Code
Supplier has ONE Supplier_Address



--- For Product
Product has ONE Supplier_Id
---- Product IS IDENTIFIED BY ITS Product_Id WRITTEN AS UnsignedInteger
Product has AT MOST ONE Primary_Category
Product has AT MOST ONE Secondary_Category
Product has AT MOST ONE Supplier_Model
Product has AT MOST ONE Product_Name
Product has AT MOST ONE Barcode
Product has ONE Product_Length
Product has ONE Product_Width
Product has ONE Product_Height
Product has ONE Product_Weight
Product has AT MOST ONE Warehouse
Product has AT MOST ONE Product_Keyin_Time
Product has ONE Source_File



--- For Storage
---- Storage IS IDENTIFIED BY ITS Sl_Id WRITTEN AS StringVariableLength(15)
Storage has ONE Supplier_Id
Storage has ONE Product_Id
Storage has ONE Storage_Count
Storage has ONE Actual_Storage_Count
Storage has ONE Specified_Arrival_Time
Storage has ONE Actual_Arrival_Time
Storage has ONE Warehouse


--=== Binary Relationships ===
--- For Order
Order contains ONE Product
Order is canceled by AT MOST ONE Cancel
Order is returned by AT MOST ONE Return
Order is shipped by ONE Shipment

-- For Product
Product is supplied by ONE Supplier
Storage stores ONE Product


--- postprocessing
---- 1. set Product_Keyin_Time
---- 2. update DBName for Entities
---- in sql
---- 3. replace /(CREATE TABLE "[^"]+"\.)(.+)/g as /$1\L$2/
