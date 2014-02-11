require 'sinatra'
require 'json'
require 'sinatra/reloader'
require 'open-uri'

# sessions
set :port, 3030
set :bind, '0.0.0.0'
set :public_folder, 'application'

# catch *any* call to this domain, and return response headers
get '/*' do
  content_type 'image/gif'
  cache_control :public, :must_revalidate, :no_cache
  status 204

  if request.cookies.empty?
    response.set_cookie(
        "tyo_beacon",
        :value    => [{t: URI::encode(params[:t]), u: params[:u]}].to_json,
        :domain   =>'tyo.asset',
        :path     => '/',
        :expires  => Time.now + 86400 * 364
    )
  else
    data = JSON.parse(request.cookies['tyo_beacon'])
    if (data.detect {|_hash| _hash['u'].eql?(params[:u]) }).nil?
      data.push({t: URI::encode(params[:t]), u: params[:u]})
      response.set_cookie(
          "tyo_beacon",
          :value    => data.to_json,
          :domain   =>'tyo.asset',
          :path     => '/',
          :expires  => Time.now + 86400 * 364
      )
    end
  end
end