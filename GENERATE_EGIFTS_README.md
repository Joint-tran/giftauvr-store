# E-Gift Card Generator

Script để generate 1000 egift records với code, PIN và purchase date.

## Cách sử dụng

### Chạy script:

```bash
node generate-egifts.js
```

## Output

Script sẽ tạo file `egift.txt` với format CSV:

```csv
ID,Code,PIN,Value,SellingPrice,PurchaseDate
1,AMZN-ABC12345-XY12,1234,100,85,2025-11-05
2,XBOX-DEF67890-ZW34,5678,50,42,2025-11-07
...
```

## Thông tin

- **Tổng số records**: 1000
- **Purchase dates**: 05/11/2025 đến 09/11/2025
- **Categories**: AMZN, GOOG, APPL, XBOX, PLAY, SPOT, NETF, STBK, TARG, WLMT, BEST, NIKE, ITUN, STEAM, RBLX
- **Values**: $25, $50, $75, $100, $150, $200, $250, $500
- **Selling Price**: 75%-90% của value

## Format

### Code Format

```
CATEGORY-XXXXXXXX-XXXX
```

Ví dụ: `AMZN-AB12CD34-EF56`

### PIN Format

```
4 digits (1000-9999)
```

Ví dụ: `1234`

### Date Format

```
YYYY-MM-DD
```

Ví dụ: `2025-11-07`

## Output Statistics

Script sẽ hiển thị:

- Tổng số records
- Phân bố theo category
- Phân bố theo purchase date
- Phân bố theo value

## File Size

File output khoảng ~100KB cho 1000 records.
