import random
import string
import argparse
from datetime import datetime, timedelta

def generate_code():
    """Generate a code in format XXXX-XXXXXXXX-XXXX"""
    chars = string.ascii_uppercase + string.digits
    part1 = ''.join(random.choices(chars, k=4))
    part2 = ''.join(random.choices(chars, k=8))
    part3 = ''.join(random.choices(chars, k=4))
    return f"{part1}-{part2}-{part3}"

def generate_pin():
    """Generate a 4-digit PIN"""
    return random.randint(1000, 9999)

def generate_selling_price(value):
    """Generate selling price based on value"""
    ratio = random.uniform(0.75, 0.90)
    return round(value * ratio)

def generate_random_date():
    """Generate random date between 2026-01-03 and 2026-01-12"""
    start_date = datetime(2026, 1, 3)
    end_date = datetime(2026, 1, 12)
    delta = (end_date - start_date).days
    random_days = random.randint(0, delta)
    return (start_date + timedelta(days=random_days)).strftime('%Y-%m-%d')

def generate_egifts_by_amount(total_amount, output_file='new_egifts.csv'):
    """Generate egift entries based on total amount"""
    values = [150, 300, 500]
    egifts = []
    remaining = total_amount
    
    while remaining > 0:
        available_values = [v for v in values if v <= remaining]
        if not available_values:
            break
        value = random.choice(available_values)
        egifts.append(value)
        remaining -= value
    
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        # Write header
        f.write("ID,Code,PIN,Value,SellingPrice,PurchaseDate\n")
        
        for value in egifts:
            code = generate_code()
            pin = generate_pin()
            selling_price = generate_selling_price(value)
            purchase_date = generate_random_date()
            
            # No ID as per user request
            f.write(f",{code},{pin},{value},{selling_price},{purchase_date}\n")
    
    actual_total = sum(egifts)
    print(f"Successfully generated {len(egifts)} egifts (total: {actual_total}) in {output_file}")

def generate_egifts(count=360, output_file='new_egifts.csv'):
    """Generate egift entries"""
    values = [150, 300, 500]
    
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        # Write header
        f.write("ID,Code,PIN,Value,SellingPrice,PurchaseDate\n")
        
        for i in range(count):
            code = generate_code()
            pin = generate_pin()
            value = random.choice(values)
            selling_price = generate_selling_price(value)
            purchase_date = generate_random_date()
            
            # No ID as per user request
            f.write(f",{code},{pin},{value},{selling_price},{purchase_date}\n")
    
    print(f"Successfully generated {count} egifts in {output_file}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate eGift entries')
    parser.add_argument('-n', '--count', type=int, default=360, help='Number of egifts to generate')
    parser.add_argument('-o', '--output', type=str, default='new_egifts.csv', help='Output file name')
    parser.add_argument('-a', '--amount', type=int, help='Total amount of egifts (overrides count)')
    
    args = parser.parse_args()
    
    if args.amount:
        generate_egifts_by_amount(args.amount, args.output)
    else:
        generate_egifts(args.count, args.output)
