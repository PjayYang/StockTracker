using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StockTracker.BusinessLayer;
using StockTracker.Interfaces;
using StockTracker.Models;

namespace StockTracker.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IWeatherForecast _weatherForecast;

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecastModel> WeatherForecasts()
        {
           IWeatherForecast weatherForecast = new WeatherForecastBL();
           return weatherForecast.getdata();
        }
    }
}
