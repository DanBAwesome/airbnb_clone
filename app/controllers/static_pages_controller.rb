class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def bookings
    render 'bookings'
  end

  def listing_dashboard
    render 'listingDashboard'
  end

  def host
    @data = { property_id: params[:id] }.to_json
    render 'host'
  end
end
