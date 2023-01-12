#!vscode
(#@=shared_attr; $$=alone_attr;) (^^=unique; !!=primary_key;) (&&=non_unique; ::=unit_based; >>=time; >_=address; ><=countable; **=enum;) #|=comment; # === Entity ===; # --- file.csv ---

# === Order ===
# --- order_2011Q3.csv, 20110630.csv, etc. ---
**$$	01. 客戶代號: `customer_id`	StringVariableLength(44)
&&	02. RG: `rg_id`	UnsignedInteger(8)
::	03. 商品材積長: `product_length`	FloatDoublePrecision(4)
::	04. 商品材積寬: `product_width`	FloatDoublePrecision(5)
::	05. 商品材積高: `product_height`	FloatDoublePrecision(5)
::	06. 商品材積重量: `product_weight`	UnsignedInteger(6)
::$$	07. 包裝箱號: `package_id`	StringFixedLength(9)	#| pattern: B12345678 (or b12345678)
&&	08. 訂單編號: `rm_id`	StringFixedLength(15)
!!	09. 子單編號: `rs_id`	StringFixedLength(15)
&&$$	10. 出貨單號: `shipping_name`	StringVariableLength(25)
>>$$	11. 訂單成立時間: `order_time`	TemporalDateTime(16)
**	12. 商品編號: `product_id`	UnsignedInteger(7)
>>$$	13. 最晚出貨日: `guaranteed_shipping_time`	TemporalDateTime(16)
>>$$	14. 出貨日: `actual_shipping_time`	TemporalDateTime(16)
**$$	15. 郵遞區號: `arrival_zip_code`	UnsignedInteger(3)
>_$$	16. 到貨地址: `arrival_address`	StringVariableLength(57)
**$$	17. 配送廠商: `shipping_company`	StringVariableLength(10)
**	18. 倉別: `warehouse`	StringVariableLength(5)
**$$	19. 出貨方式: `shipping_method`	StringVariableLength(3)
><$$	20. 累計配送次數: `redelivery_count`	Optional(UnsignedInteger(1))


# === Return ===
# --- retgood_20120823.csv ---
&&#@	01. RG單號: `rg_id`	UnsignedInteger(8)
&&#@	02. RM單號: `rm_id`	StringFixedLength(15)
^^#@	03. RS單號: `rs_id`	StringFixedLength(15)
!!$$	04. 退貨單號: `return_id`	StringVariableLength(13)
>>$$	05. 退貨單成立日期: `return_establish_time`	TemporalDateTime(16)
>>	06. 退貨完成日期: `return_complete_time`	TemporalDateTime(16)
**	07. 退貨原因: `return_reason`	StringVariableLength(15)


# === Cancel ===
# --- cancel_order.csv --- (`rg_id` is deduplicated)
!!#@	01. RG單號: `rg_id`	UnsignedInteger(8)
>>$$	02. 取消日期: `cancel_time`	TemporalDateTime(16)
**$$	03. proc_status: `proc_status`	UnsignedInteger(2)
**$$	04. 取消原因: `cancel_reason`	StringVariableLength(15)


# === Shipment ===
# --- 供應商出貨_直店配.csv --- (`rm_id` is deduplicated based on `failure_code`)
&&#@	01. RG單號: `rg_id`	UnsignedInteger(8)
!!#@	02. RM單號: `rm_id`	StringFixedLength(15)
&&	03. 出貨單號: `shipping_id`	UnsignedInteger(8)
>>#@	04. 退貨完成日期: `return_complete_time`	TemporalDateTime(16)
**$$	05. 失敗代碼: `failure_code`	StringVariableLength(3)
**$$	06. 失敗原因: `failure_reason`	StringVariableLength(15)
**	07. 超商通路: `convenience_store`	StringVariableLength(12)	#| diff: not same as 倉出_店配.csv


# === Shipment ===
# --- 倉出_店配.csv ---
&&#@	01. RG單號: `rg_id`	UnsignedInteger(8)
!!#@	02. RM單號: `rm_id`	StringFixedLength(15)
^^#@	03. 出貨單號: `shipping_id`	UnsignedInteger(8)	#| exception: some (CVS) start with 0000 and become 11 digits; some (門市閉店(4)) are empty
>>#@	04. 退貨完成日期: `return_complete_time`	TemporalDateTime(16)
**#@	05. 退貨原因: `return_reason`	StringVariableLength(10)
**#@	06. 超商通路: `convenience_store`	StringVariableLength(5)	#| diff: not same as 供應商出貨_直店配.csv


# === Supplier ===
# --- supplier.csv --- (`supplier_id` is deduplicated)
!!	01. 供應商代號: `supplier_id`	UnsignedInteger(5)
^^$$	02. 供應商名稱: `supplier_name`	StringVariableLength(32)
**$$	03. 出貨地郵遞區號: `shipping_zip_code`	UnsignedInteger(3)
>_$$	04. 供應商出貨地址: `shipping_address`	StringVariableLength(54)
**$$	05. 登記地郵遞區號: `supplier_zip_code`	UnsignedInteger(3)
>_$$	06. 供應商登記地址: `supplier_address`	StringVariableLength(54)


# === Product ===
# --- 2012_product_list.csv ---
!!#@	01. 商品編號: `product_id`	UnsignedInteger(7)
**	02. 商品編號*: `product_name`	StringVariableLength(50)
**#@	03. 供應商編號: `supplier_id`	UnsignedInteger(5)
::#@	04. 商品材積(長)cm: `product_length`	FloatDoublePrecision(3)
::#@	05. 商品材積(寬)cm: `product_width`	FloatDoublePrecision(3)
::#@	06. 商品材積(高)cm: `product_height`	FloatDoublePrecision(3)
::#@	07. 商品材積(重量)g: `product_weight`	UnsignedInteger(6)
**#@	08. 倉別: `warehouse`	StringVariableLength(2)
>>$$	09. 商品建檔時間: `product_keyin_time`	TemporalDateTime(7)


# === Product ===
# --- sku_20120413.csv ---
**#@	01. 供應商代號: `supplier_id`	UnsignedInteger(5)
**	02. 大分類: `primary_category`	UnsignedInteger(5)
**	03. 小分類: `secondary_category`	UnsignedInteger(5)
!!#@	04. 商品編號: `product_id`	UnsignedInteger(7)
**#@	05. 商品名稱: `product_name`	StringVariableLength(50)
::#@	06. 材積(長): `product_length`	FloatDoublePrecision(4)
::#@	07. 材積(寬): `product_width`	FloatDoublePrecision(4)
::#@	08. 材積(高): `product_height`	FloatDoublePrecision(4)
::#@	09. 材積(重量): `product_weight`	UnsignedInteger(6)


# === Product ===
# --- sku_20120604.csv ---
**#@	01. 供應商序號: `supplier_id`	UnsignedInteger(5)
!!#@	02. 商品編號: `product_id`	UnsignedInteger(7)
&&	03. 供應商料號(型號): `supplier_model`	StringVariableLength(42)
^^	04. 國際條碼: `barcode`	StringFixedLength(13)
::#@	05. 商品材積(長): `product_length`	FloatDoublePrecision(3)
::#@	06. 商品材積(寬): `product_width`	FloatDoublePrecision(3)
::#@	07. 商品材積(高): `product_height`	FloatDoublePrecision(4)
::#@	08. 商品重量: `product_weight`	UnsignedInteger(6)
**#@	09. 倉別: `warehouse`	StringVariableLength(2)


# === Product ===
# --- product(倉出).csv ---
**#@	01. 供應商序號: `supplier_id`	UnsignedInteger(5)
!!#@	02. 商品編號: `product_id`	UnsignedInteger(7)
**#@	03. 父類: `primary_category`	UnsignedInteger(5)
**#@	04. 子類: `secondary_category`	UnsignedInteger(5)
&&#@	05. 供應商料號(型號): `supplier_model`	StringVariableLength(50)
**#@	06. 商品名稱: `product_name`	StringVariableLength(50)
^^#@	07. 國際條碼: `barcode`	StringFixedLength(13)
::#@	08. 商品材積(長): `product_length`	FloatDoublePrecision(4)
::#@	09. 商品材積(寬): `product_width`	FloatDoublePrecision(5)
::#@	10. 商品材積(高): `product_height`	FloatDoublePrecision(5)
::#@	11. 商品重量: `product_weight`	UnsignedInteger(6)
**#@	12. 倉別: `warehouse`	StringVariableLength(2)



# === Storage ===
# --- stlend.csv ---
!!	01. 寄倉單單號: `sl_id`	StringVariableLength(15)
**#@	02. 供應商代號: `supplier_id`	UnsignedInteger(5)
**#@	03. 商品編號: `product_id`	UnsignedInteger(7)
><$$	04. 入庫數量: `storage_count`	UnsignedInteger(7)
><$$	05. 實際入庫數量: `actual_storage_count`	UnsignedInteger(4)
>>$$	06. 指定到貨日: `specified_arrival_time`	TemporalDateTime(16)
>>$$	07. 實際到貨日: `actual_arrival_time`	TemporalDateTime(16)
**#@	08. 倉別: `warehouse`	StringVariableLength(2)
