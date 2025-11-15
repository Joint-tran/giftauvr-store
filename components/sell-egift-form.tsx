"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { submitEgift } from "@/lib/actions/egift.actions";
import { CATEGORIES, searchCategories } from "@/lib/categories";
import { useRouter } from "next/navigation";
import { ShoppingBag, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function SellEgiftForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    categoryId: "",
    cardCode: "",
    pin: "",
    value: "",
    sellingPrice: "",
    expiryDate: "",
    notes: "",
  });

  const selectedCategory = CATEGORIES.find(
    (cat) => cat.id === formData.categoryId
  );

  const filteredCategories = searchQuery
    ? searchCategories(searchQuery)
    : CATEGORIES;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.categoryId ||
      !formData.cardCode ||
      !formData.value ||
      !formData.sellingPrice
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const value = parseFloat(formData.value);
    const sellingPrice = parseFloat(formData.sellingPrice);

    if (sellingPrice > value) {
      alert("Selling price cannot exceed card value");
      return;
    }

    if (sellingPrice <= 0) {
      alert("Selling price must be greater than 0");
      return;
    }

    setLoading(true);
    const result = await submitEgift({
      categoryId: formData.categoryId,
      cardCode: formData.cardCode,
      pin: formData.pin || undefined,
      value,
      sellingPrice,
      expiryDate: formData.expiryDate || undefined,
      notes: formData.notes || undefined,
    });

    if (result.success) {
      alert(result.message);
      setFormData({
        categoryId: "",
        cardCode: "",
        pin: "",
        value: "",
        sellingPrice: "",
        expiryDate: "",
        notes: "",
      });
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Submit Gift Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-mono"
                >
                  {selectedCategory
                    ? selectedCategory.id
                    : "Select category..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search category..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {filteredCategories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.id}
                          onSelect={() => {
                            handleChange("categoryId", category.id);
                            setOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.categoryId === category.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <span className="font-mono">{category.id}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedCategory && (
              <p className="text-xs text-muted-foreground font-mono">
                Selected: {selectedCategory.id}
              </p>
            )}
          </div>

          {/* Card Code */}
          <div className="space-y-2">
            <Label htmlFor="cardCode">
              Card Code / Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cardCode"
              type="text"
              placeholder="Enter gift card code..."
              value={formData.cardCode}
              onChange={(e) => handleChange("cardCode", e.target.value)}
              required
            />
          </div>

          {/* PIN (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="pin">PIN (if applicable)</Label>
            <Input
              id="pin"
              type="text"
              placeholder="Enter PIN..."
              value={formData.pin}
              onChange={(e) => handleChange("pin", e.target.value)}
            />
          </div>

          {/* Card Value */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">
                Card Value (USD) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                min="1"
                placeholder="100.00"
                value={formData.value}
                onChange={(e) => handleChange("value", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellingPrice">
                Selling Price (USD) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="sellingPrice"
                type="number"
                step="0.01"
                min="1"
                placeholder="85.00"
                value={formData.sellingPrice}
                onChange={(e) => handleChange("sellingPrice", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Discount Display */}
          {formData.value && formData.sellingPrice && (
            <div className="text-sm text-muted-foreground">
              Discount:{" "}
              <span className="font-semibold text-primary">
                {(
                  ((parseFloat(formData.value) -
                    parseFloat(formData.sellingPrice)) /
                    parseFloat(formData.value)) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          )}

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the card..."
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              ⚠️ Your gift card will be reviewed by our team before being listed
              for sale.
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Submit Gift Card
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
