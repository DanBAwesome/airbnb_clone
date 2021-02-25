json.booking do
    json.title @booking.property.title
    json.city @booking.property.city
    json.country @booking.property.country
    json.property_type @booking.property.property_type
    json.price_per_night @booking.property.price_per_night
    json.images do
        image_urls = []
        @booking.property.images.each do |image|
            image_urls.push(url_for(image))
        end
    json.array! image_urls
    end
    json.start_date @booking.start_date
    json.end_date @booking.end_date
    json.total_price @booking.total_price
end