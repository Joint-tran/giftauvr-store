import random
import string

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

def generate_selling_price():
    """Generate selling price between 112 and 134"""
    return random.randint(112, 134)

def generate_egifts(count=360, output_file='new_egifts.csv'):
    """Generate egift entries"""
    dates = ['2025-11-08', '2025-12-08']
    
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        # Write header
        f.write("ID,Code,PIN,Value,SellingPrice,PurchaseDate\n")
        
        for i in range(count):
            code = generate_code()
            pin = generate_pin()
            value = 150
            selling_price = generate_selling_price()
            purchase_date = random.choice(dates)
            
            # No ID as per user request
            f.write(f",{code},{pin},{value},{selling_price},{purchase_date}\n")
    
    print(f"Successfully generated {count} egifts in {output_file}")

if __name__ == "__main__":
    generate_egifts(360)
